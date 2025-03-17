import type { HttpContext } from '@adonisjs/core/http'

import TypeOfQuestion from '#models/type_of_question';
import TypeOfQuestionTransformer from '#transformers/TypeOfQuestionTransformer';

export default class TypeOfQuestionController {
  async index({ response }: HttpContext) {
    const typeOfQuestions = await TypeOfQuestion.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await TypeOfQuestionTransformer.collection(typeOfQuestions)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const typeOfQuestion = await TypeOfQuestion.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await TypeOfQuestionTransformer.transform(typeOfQuestion),
    })
  }
}
