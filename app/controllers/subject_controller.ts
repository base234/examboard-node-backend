import type { HttpContext } from '@adonisjs/core/http'

import Subject from '#models/subject';
import SubjectTransformer from '#transformers/SubjectTransformer';

export default class SubjectController {
  async index({ response }: HttpContext) {
    const subjects = await Subject.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await SubjectTransformer.collection(subjects)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const subject = await Subject.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await SubjectTransformer.transform(subject),
    })
  }
}
