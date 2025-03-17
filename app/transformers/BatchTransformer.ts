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

    await batch.load('type_of_school')

    return {
      id: batch.uuid,
      uuid: batch.uuid,
      name: batch.name,
      description: batch.description,

      type_of_school: {
        id: batch.type_of_school.uuid,
        flag: batch.type_of_school.flag,
        display_flag: batch.type_of_school.display_flag,
      },

      ...(isShowStudents  && {
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
