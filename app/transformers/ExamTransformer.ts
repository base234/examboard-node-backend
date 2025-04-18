import Exam from '#models/exam'

export default class ExamTransformer {
  public static async transform(exam: Exam) {
    await exam.load('batches')
    await exam.batches.load('students')
    await exam.load('question_papers')

    return {
      id: exam.uuid,
      name: exam.name,
      batch: exam.batches ? {
        id: exam.batches.uuid,
        name: exam.batches.name,
        description: exam.batches.description,
        students:{
          count: exam.batches.students.length
        },
      } : null,
      question_paper: exam.question_papers ? {
        id: exam.question_papers.uuid,
        no: exam.question_papers.no,
        code: exam.question_papers.code,
        type_of_assessment: exam.question_papers.type_of_assessment ? {
          id: exam.question_papers.type_of_assessment.uuid,
          flag: exam.question_papers.type_of_assessment.flag,
          display_flag: exam.question_papers.type_of_assessment.display_flag,
        } : null,
        name: exam.question_papers.name,
        total_marks: exam.question_papers.total_marks,
        duration: exam.question_papers.duration,
      } : null,
      duration: exam.duration,
      start_time: exam.start_time,
      end_time: exam.end_time,
      created_at: exam.createdAt,
      updated_at: exam.updatedAt,
    }
  }

  public static async collection(exams: Exam[]) {
    return Promise.all(exams.map((exam) => this.transform(exam)))
  }
}
