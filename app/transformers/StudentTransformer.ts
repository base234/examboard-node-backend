import Batch from '#models/batch'
import Student from '#models/student'

export default class StudentTransformer {
  public static async transform(student: Student) {
    await student.load('batches')

    return {
      id: student.uuid,
      uuid: student.uuid,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      full_name: `${student.first_name ?? ''} ${student.last_name ?? ''}`.trim(),
      batches: student.batches.map((batch: Batch) => ({
        id: batch.uuid,
        name: batch.name,
      })),
      created_at: student.createdAt,
      updated_at: student.updatedAt,
    }
  }

  public static async collection(students: Student[], excludeBatch = null) {
    // If excludeBatch is provided, filter out students who belong to that batch
    let filteredStudents = students;

    if (excludeBatch) {
      // Ensure all students have their batches loaded
      await Promise.all(students.map(student => student.load('batches')));

      // Filter out students that belong to the excluded batch
      filteredStudents = students.filter(student =>
        !student.batches.some((batch: Batch) => batch.uuid === excludeBatch)
      );
    }

    // Transform the remaining students
    return Promise.all(filteredStudents.map((student) => this.transform(student)));
  }
}
