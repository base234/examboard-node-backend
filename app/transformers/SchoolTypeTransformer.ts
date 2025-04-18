import SchoolType from '#models/school_type'

export default class SchoolTypeTransformer {
  public static async transform(school_type: SchoolType) {

    await school_type.load('school_levels');
    await school_type.load('school_classes');

    return {
      id: school_type.uuid,
      flag: school_type.flag,
      display_flag: school_type.display_flag,
      short_name: school_type.short_name,
      school_levels: school_type.school_levels.length > 0 ? school_type.school_levels.map((school_type) => ({
        id: school_type.uuid,
        flag: school_type.flag,
        display_flag: school_type.display_flag,
      })) : null,
      school_classes: school_type.school_classes.length > 0 ? school_type.school_classes.map((school_class) => ({
        id: school_class.uuid,
        flag: school_class.flag,
        display_flag: school_class.display_flag,
        short_name: school_class.short_name,
      })) : null,
      created_at: school_type.createdAt,
      updated_at: school_type.updatedAt,
    }
  }

  public static async collection(school_types: SchoolType[]) {
    return Promise.all(school_types.map((school_type) => this.transform(school_type)))
  }
}
