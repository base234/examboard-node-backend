import TypeOfQuestion from '#models/type_of_question'

export default class TypeOfQuestionTransformer {
  public static async transform(type_of_question: TypeOfQuestion) {

    return {
      id: type_of_question.uuid,
      flag: type_of_question.flag,
      display_flag: type_of_question.display_flag,
      shorthand: type_of_question.shorthand,
      created_at: type_of_question.createdAt,
      updated_at: type_of_question.updatedAt,
    }
  }

  public static async collection(type_of_questions: TypeOfQuestion[]) {
    return Promise.all(type_of_questions.map((type_of_question) => this.transform(type_of_question)))
  }
}
