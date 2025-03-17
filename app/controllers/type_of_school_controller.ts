import type { HttpContext } from '@adonisjs/core/http'

import TypeOfSchool from '#models/type_of_school';
import TypeOfSchoolTransformer from '#transformers/TypeOfSchoolTransformer';

export default class TypeOfSchoolController {
  async index({ response }: HttpContext) {
    const typeOfSchools = await TypeOfSchool.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await TypeOfSchoolTransformer.collection(typeOfSchools)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const typeOfSchool = await TypeOfSchool.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await TypeOfSchoolTransformer.transform(typeOfSchool),
    })
  }
}
