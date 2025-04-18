import QuestionPaper from '#models/question_paper'
import { DateTime } from 'luxon'

export default class QuestionPaperTransformer {
  public static async transform(question_paper: QuestionPaper, isShowQuestions: boolean = false) {

    let questions: Array<{
      id: string,
      teacher_id: number,
      is_created_by_user: boolean,
      type_of_school: {
        id: string,
        flag: string,
        display_flag: string,
        created_at: DateTime,
        updated_at: DateTime | null,
      } | null,
      type_of_question: {
        id: string,
        flag: string,
        display_flag: string,
        shorthand: string | null,
        created_at: DateTime,
        updated_at: DateTime | null,
      } | null,
    }> = []

    if (isShowQuestions) {
      if (!question_paper.$preloaded.questions_bank) {
        await question_paper.load('questions_bank')
      }

      for (const q of question_paper.questions_bank) {
        if (!q.$preloaded.type_of_school) {
          await q.load('type_of_school')
        }
        if (!q.$preloaded.type_of_question) {
          await q.load('type_of_question')
        }
      }

      questions = question_paper.questions_bank && question_paper.questions_bank.length > 0
        ? await Promise.all(question_paper.questions_bank.map((question) => ({
          id: question.uuid,
          teacher_id: question.teacher_id,
          is_created_by_user: question.is_created_by_user,
          type_of_school: question.type_of_school
            ? {
              id: question.type_of_school.uuid,
              flag: question.type_of_school.flag,
              display_flag: question.type_of_school.display_flag,
              created_at: question.type_of_school.createdAt,
              updated_at: question.type_of_school.updatedAt,
            }
            : null,
          type_of_question: question.type_of_question
            ? {
              id: question.type_of_question.uuid,
              flag: question.type_of_question.flag,
              display_flag: question.type_of_question.display_flag,
              shorthand: question.type_of_question.shorthand,
              created_at: question.type_of_question.createdAt,
              updated_at: question.type_of_question.updatedAt,
            }
            : null,
          question: question.question,
          options: question.options,
          answer_options: question.answer_options,
          answer_paragraph: question.answer_paragraph,
          explanation: question.explanation,
          difficulty: question.difficulty,
          marks: question.marks,
          duration: question.duration,
          note: question.note,
        })))
        : []
    }

    await question_paper.load('type_of_assessment')

    return {
      id: question_paper.uuid,
      no: question_paper.no,
      code: question_paper.code,
      type_of_assessment: question_paper.type_of_assessment ? {
        id: question_paper.type_of_assessment.uuid,
        flag: question_paper.type_of_assessment.flag,
        display_flag: question_paper.type_of_assessment.display_flag,
        description: question_paper.type_of_assessment.description,
        created_at: question_paper.type_of_assessment.createdAt,
        updated_at: question_paper.type_of_assessment.updatedAt,
      } : null,
      name: question_paper.name,
      total_marks: question_paper.total_marks,
      duration: question_paper.duration,

      ...(isShowQuestions && {
        questions: questions
      }),

      created_at: question_paper.createdAt,
      updated_at: question_paper.updatedAt,
    }
  }

  public static async collection(question_papers: QuestionPaper[]) {
    return Promise.all(question_papers.map((question_paper) => this.transform(question_paper)))
  }
}
