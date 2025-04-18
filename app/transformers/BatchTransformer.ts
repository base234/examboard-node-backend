import Batch from '#models/batch'

export default class BatchTransformer {
  public static async transform(batch: Batch, isShowStudents: boolean = false) {

    let students: Array<{ id: string, full_name: string, email: string }> = []

    if (isShowStudents) {
      if (!batch.$preloaded.students) {
        await batch.load('students')
      }

      students = batch.students && batch.students.length > 0
        ? await Promise.all(batch.students.map((student) => ({
          id: student.uuid,
          full_name: `${student.first_name} ${student.last_name}`,
          email: student.email
        })))
        : []
    }

    await batch.load('school_type')
    await batch.load('school_level')
    await batch.load('school_class')
    await batch.load('subject')

    return {
      id: batch.uuid,
      name: batch.name,
      description: batch.description,
      school_type: batch.school_type ? {
        id: batch.school_type.uuid,
        flag: batch.school_type.flag,
        display_flag: batch.school_type.display_flag,
        short_name: batch.school_type.short_name
      } : null,
      school_level: batch.school_level ? {
        id: batch.school_level.uuid,
        flag: batch.school_level.flag,
        display_flag: batch.school_level.display_flag,
        short_name: batch.school_level.short_name
      } : null,
      school_class: batch.school_class ? {
        id: batch.school_class.uuid,
        flag: batch.school_class.flag,
        display_flag: batch.school_class.display_flag,
        short_name: batch.school_class.short_name
      } : null,
      subject: batch.subject ? {
        id: batch.subject.uuid,
        flag: batch.subject.flag,
        display_flag: batch.subject.display_flag,
        short_name: batch.subject.short_name
      } : null,

      ...(isShowStudents && {
        students: students
      }),

      created_at: batch.createdAt,
      updated_at: batch.updatedAt,
    }
  }

  public static async collection(batches: Batch[]) {
    return Promise.all(batches.map((batch) => this.transform(batch)))
  }
}
