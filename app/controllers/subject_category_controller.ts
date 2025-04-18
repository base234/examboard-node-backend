import type { HttpContext } from '@adonisjs/core/http'

import SubjectCategory from '#models/subject_category';
import SubjectCategoryTransformer from '#transformers/SubjectCategoryTransformer';

export default class SubjectCategoryController {
  async index({ response }: HttpContext) {
    const subjectCategories = await SubjectCategory.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await SubjectCategoryTransformer.collection(subjectCategories)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const subjectCategory = await SubjectCategory.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await SubjectCategoryTransformer.transform(subjectCategory),
    })
  }
}
