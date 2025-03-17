import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student';
import StudentTransformer from '#transformers/StudentTransformer';

export default class StudentsController {
  async index({ auth, request, response }: HttpContext) {
    const { excludeBatch } = request.qs();
    const students = await Student.query().where('teacher_id', auth.user!.id).preload('batches').orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Students fetched successfully',
      data: await StudentTransformer.collection(students, excludeBatch)
    });
  }

  async show({ params, response }: HttpContext) {


    const student = await Student.query().where('uuid', params.id).preload('batches').firstOrFail();

    return response.status(200).send({
      status: 'success',
      message: 'Student fetched successfully',
      data: await StudentTransformer.transform(student),
    })
  }

  async store({ auth, request, response }: HttpContext) {
    let { data } = request.all();

    const roleInstance: any = await auth.user!.getRoleInstance();
    data.teacher_id = roleInstance.id;

    const student_data = await Student.query().where({
      teacher_id: roleInstance.id,
      email: data.email,
    }).first();

    if(student_data) {
      return response.status(401).send({
        status: 'error',
        message: 'Student already exists!',
      });
    }

    const student = await Student.create(data);

    return response.status(200).send({
      status: 'success',
      message: 'Student created successfully',
      data: await StudentTransformer.transform(student),
    });
  }

  /**
   * Edit individual record
   */
  async edit({ }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ }: HttpContext) {
  }

  /**
   * Delete record
   */
  async destroy({ }: HttpContext) { }
}
