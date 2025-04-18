import SchoolClass from '#models/school_class'

export default class SchoolClassTransformer {
  public static async transform(school_class: SchoolClass) {

    await school_class.load('school_type');
    await school_class.load('school_level');

    return {
      id: school_class.uuid,
      flag: school_class.flag,
      display_flag: school_class.display_flag,
      short_name: school_class.short_name,
      school_type: school_class.school_type ? school_class.school_type : null,
      school_level: school_class.school_level ? school_class.school_level : null,
      created_at: school_class.createdAt,
      updated_at: school_class.updatedAt,
    }
  }

  public static async collection(school_classes: SchoolClass[]) {
    return Promise.all(school_classes.map((school_class) => this.transform(school_class)))
  }
}
