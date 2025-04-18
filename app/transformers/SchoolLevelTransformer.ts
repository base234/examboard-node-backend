import SchoolLevel from '#models/school_level'

export default class SchoolLevelTransformer {
  public static async transform(school_level: SchoolLevel) {

    await school_level.load('school_type');
    await school_level.load('school_classes');

    return {
      id: school_level.uuid,
      flag: school_level.flag,
      display_flag: school_level.display_flag,
      short_name: school_level.short_name,
      school_type: school_level.school_type ? school_level.school_type : null,
      school_classes: school_level.school_classes.length > 0 ? school_level.school_classes.map((school_class) => ({
        id: school_class.uuid,
        flag: school_class.flag,
        display_flag: school_class.display_flag,
        short_name: school_class.short_name,
      })) : null,
      created_at: school_level.createdAt,
      updated_at: school_level.updatedAt,
    }
  }

  public static async collection(school_levels: SchoolLevel[]) {
    return Promise.all(school_levels.map((school_level) => this.transform(school_level)))
  }
}
