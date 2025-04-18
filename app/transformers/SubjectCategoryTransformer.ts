import SubjectCategory from '#models/subject_category'

export default class SubjectCategoryTransformer {
  public static async transform(subject_category: SubjectCategory) {

    await subject_category.load('subjects');

    return {
      id: subject_category.uuid,
      flag: subject_category.flag,
      display_flag: subject_category.display_flag,
      short_name: subject_category.short_name,
      subjects: subject_category.subjects.length > 0 ? subject_category.subjects.map((subject) => ({
        id: subject.uuid,
        flag: subject.flag,
        display_flag: subject.display_flag,
        short_name: subject.short_name,
      })) : null,
      created_at: subject_category.createdAt,
      updated_at: subject_category.updatedAt,
    }
  }

  public static async collection(subject_categories: SubjectCategory[]) {
    return Promise.all(subject_categories.map((subject_category) => this.transform(subject_category)))
  }
}
