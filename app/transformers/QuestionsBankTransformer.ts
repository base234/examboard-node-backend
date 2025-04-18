import QuestionPaper from '#models/question_paper';
import QuestionsBank from '#models/questions_bank'

export default class QuestionsBankTransformer {
  public static async transform(questions_bank: QuestionsBank) {

    await questions_bank.load('type_of_school')
    await questions_bank.load('type_of_question');
    await questions_bank.load('question_papers')

    return {
      id: questions_bank.uuid,
      is_created_by_user: questions_bank.is_created_by_user,
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
      question_papers: questions_bank.question_papers.length > 0 ?questions_bank.question_papers.map((question_paper) => ({
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

        created_at: question_paper.createdAt,
        updated_at: question_paper.updatedAt,
      })) : null,
      created_at: questions_bank.createdAt,
      updated_at: questions_bank.updatedAt,
    }
  }

  public static async collection(questions_bank: QuestionsBank[], excludeQuestionPaper = null) {

    let filteredQuestions = questions_bank;

    if (excludeQuestionPaper) {
      // Ensure all questions have their question papers loaded
      await Promise.all(questions_bank.map(question => question.load('question_papers')));

      // Filter out questions that belong to the excluded question paper
      filteredQuestions = questions_bank.filter(question =>
        !question.question_papers.some((question_paper: QuestionPaper) => question_paper.uuid === excludeQuestionPaper)
      );
    }
    return Promise.all(filteredQuestions.map((question) => this.transform(question)))
  }
}
