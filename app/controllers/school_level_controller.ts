import type { HttpContext } from '@adonisjs/core/http'

import SchoolLevel from '#models/school_level';
import SchoolLevelTransformer from '#transformers/SchoolLevelTransformer';
import SchoolType from '#models/school_type';

export default class SchoolLevelTypeController {
  async index({ params,response }: HttpContext) {
    const { uuid } = params;

    if (uuid) {
      const schoolType = await SchoolType.query().where('uuid', uuid).firstOrFail();
      const schoolLevels = await SchoolLevel.query().where('school_type_id', schoolType.id).orderBy('created_at', 'asc').exec();

      return response.status(200).send({
        status: 'success',
        message: 'Schools fetched successfully',
        data: await SchoolLevelTransformer.collection(schoolLevels)
      });
    }

    const schoolLevels = await SchoolLevel.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await SchoolLevelTransformer.collection(schoolLevels)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const schoolLevel = await SchoolLevel.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await SchoolLevelTransformer.transform(schoolLevel),
    })
  }
}
