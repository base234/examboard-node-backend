import type { HttpContext } from '@adonisjs/core/http'

import TypeOfAssessment from '#models/type_of_assessment';
import TypeOfAssessmentTransformer from '#transformers/TypeOfAssessmentTransformer';

export default class TypeOfQuestionController {
  async index({ response }: HttpContext) {
    const typeOfAssessments = await TypeOfAssessment.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Assessments fetched successfully',
      data: await TypeOfAssessmentTransformer.collection(typeOfAssessments)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const typeOfAssessment = await TypeOfAssessment.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'Assessments fetched successfully',
      data: await TypeOfAssessmentTransformer.transform(typeOfAssessment),
    })
  }
}
