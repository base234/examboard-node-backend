import Subject from "#models/subject";

export default class SubjectTransformer {
  public static async transform(subject: Subject) {

    await subject.load('subject_category');

    return {
      id: subject.uuid,
      flag: subject.flag,
      display_flag: subject.display_flag,
      short_name: subject.short_name,
      subject_category: subject.subject_category ? {
        id: subject.subject_category.uuid,
        flag: subject.subject_category.flag,
        display_flag: subject.subject_category.display_flag,
        short_name: subject.subject_category.short_name,
      } : null,
      created_at: subject.createdAt,
      updated_at: subject.updatedAt,
    }
  }

  public static async collection(subjects: Subject[]) {
    return Promise.all(subjects.map((subject) => this.transform(subject)))
  }
}
