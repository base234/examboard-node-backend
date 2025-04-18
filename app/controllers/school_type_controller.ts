import type { HttpContext } from '@adonisjs/core/http'

import SchoolType from '#models/school_type';
import SchoolTypeTransformer from '#transformers/SchoolTypeTransformer';

export default class SchoolTypeController {
  async index({ response }: HttpContext) {
    const schoolTypes = await SchoolType.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Education Levels fetched successfully',
      data: await SchoolTypeTransformer.collection(schoolTypes)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const schoolType = await SchoolType.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'Education Level fetched successfully',
      data: await SchoolTypeTransformer.transform(schoolType),
    })
  }
}
