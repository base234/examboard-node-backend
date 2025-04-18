import QuestionsBank from '#models/questions_bank';
import TypeOfQuestion from '#models/type_of_question';
import QuestionsBankTransformer from '#transformers/QuestionsBankTransformer';
import type { HttpContext } from '@adonisjs/core/http'

export default class QuestionsBanksController {
  /**
   * Display a list of resource
   */
  async index({ auth, request, response }: HttpContext) {
    const { excludeQuestionPaper } = request.qs();

    const questions = await QuestionsBank.query().where('teacher_id', auth.user!.id).preload('question_papers').orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Questions banks fetched successfully',
      data: await QuestionsBankTransformer.collection(questions, excludeQuestionPaper)
    });
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const { type_of_question } = request.qs();

    const typeOfQuestionId = await TypeOfQuestion.query().where('flag', type_of_question).firstOrFail();

    if (!typeOfQuestionId) {
      return response.status(401).send({
        status: 'error',
        message: "Type of Question doesn't exist"
      });
    }

    const { data } = request.all();

    const roleInstance: any = await auth.user!.getRoleInstance();

    const teacherId = roleInstance?.id;

    const payload: any = {
      teacher_id: teacherId,
      is_created_by_user: true,
      type_of_question_id: typeOfQuestionId.id,
      question: data.question,
      options: data.options,
      answer_options: [data.correct_answer],
      answer_paragraph: data.answer_paragraph,
      explanation: data.explanation,
      marks: 1,
      duration: 40,
      note: data.note,
    };

    await QuestionsBank.create(payload);

    return response.status(200).send({
      status: 'success',
      message: 'Question created successfully',
    });
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { id } = params;

    const questionBank = await QuestionsBank.query().where('uuid', id).firstOrFail();

    return response.status(200).send({
      status: 'success',
      message: 'Questions bank fetched successfully',
      data: await QuestionsBankTransformer.transform(questionBank)
    });
  }

  /**
   * Edit individual record
   */
  async edit({ }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params;

    const questionBank = await QuestionsBank.query().where('uuid', id).firstOrFail();

    await questionBank.delete();

    return response.status(200).send({
      status: 'success',
      message: 'Questions bank deleted successfully',
    });
  }
}
