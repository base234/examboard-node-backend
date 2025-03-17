import QuestionsBank from '#models/questions_bank'

export default class QuestionsBankTransformer {
  public static async transform(questions_bank: QuestionsBank) {

    await questions_bank.load('type_of_school');
    await questions_bank.load('type_of_question');

    return {
      id: questions_bank.uuid,
      is_created_by_user: questions_bank.is_created_by_user,
      type_of_school: {
        id: questions_bank.type_of_school.uuid,
        flag: questions_bank.type_of_school.flag,
        display_flag: questions_bank.type_of_school.display_flag,
      },
      type_of_question: {
        id: questions_bank.type_of_question.uuid,
        flag: questions_bank.type_of_question.flag,
        display_flag: questions_bank.type_of_question.display_flag,
        shorthand: questions_bank.type_of_question.shorthand,
      },
      question: questions_bank.question,
      options: questions_bank.options,
      answer_options: questions_bank.answer_options,
      answer_paragraph: questions_bank.answer_paragraph,
      explanation: questions_bank.explanation,
      difficulty: questions_bank.difficulty,
      marks: questions_bank.marks,
      duration: questions_bank.duration,
      note: questions_bank.note,
      created_at: questions_bank.createdAt,
      updated_at: questions_bank.updatedAt,
    }
  }

  public static async collection(questions_bank: QuestionsBank[]) {
    return Promise.all(questions_bank.map((question) => this.transform(question)))
  }
}
