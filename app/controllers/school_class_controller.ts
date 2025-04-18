import type { HttpContext } from '@adonisjs/core/http'

import SchoolClass from '#models/school_class';
import SchoolClassTransformer from '#transformers/SchoolClassTransformer';
import SchoolType from '#models/school_type';
import SchoolLevel from '#models/school_level';

export default class SchoolClassController {
  async index({ params, response }: HttpContext) {
    const { uuid, level_id } = params;

    if (uuid && level_id) {
      const schoolType = await SchoolType.query().where('uuid', uuid).firstOrFail();
      const schoolLevel = await SchoolLevel.query().where('uuid', level_id).firstOrFail();

      const schoolClasses = await SchoolClass.query().where({
        'school_type_id': schoolType.id,
        'school_level_id': schoolLevel.id,
      }).orderBy('created_at', 'asc').exec();

      return response.status(200).send({
        status: 'success',
        message: 'Schools fetched successfully',
        data: await SchoolClassTransformer.collection(schoolClasses)
      });
    }

    if (uuid) {
      const schoolType = await SchoolType.query().where('uuid', uuid).firstOrFail();

      const schoolClasses = await SchoolClass.query().where('school_type_id', schoolType.id).orderBy('created_at', 'asc').exec();

      return response.status(200).send({
        status: 'success',
        message: 'Schools fetched successfully',
        data: await SchoolClassTransformer.collection(schoolClasses)
      });
    }

    const schoolClasses = await SchoolClass.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await SchoolClassTransformer.collection(schoolClasses)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const schoolClass = await SchoolClass.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await SchoolClassTransformer.transform(schoolClass),
    })
  }
}
