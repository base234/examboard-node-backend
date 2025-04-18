import type { HttpContext } from '@adonisjs/core/http'

import Exam from '#models/exam';
import ExamTransformer from '#transformers/ExamTransformer';
import vine from '@vinejs/vine';
import Batch from '#models/batch';
import QuestionPaper from '#models/question_paper';

export default class ExamController {
  async index({ response }: HttpContext) {
    const exams = await Exam.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Schools fetched successfully',
      data: await ExamTransformer.collection(exams)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;
    const exam = await Exam.firstOrFail(id);

    return response.status(200).send({
      status: 'success',
      message: 'School fetched successfully',
      data: await ExamTransformer.transform(exam),
    })
  }

  async store({ auth, request, response }: HttpContext) {
    const { data } = request.all();

    const rules = vine.object({
      serial_no: vine.string().unique({ table: 'exams', column: 'serial_no' }),
      name: vine.string(),
      batch_id: vine.string(),
      question_paper_id: vine.string(),
    })

    const state = {
      serial_no: data.serial_no,
      name: data.name,
      batch_id: data.batch_id,
      question_paper_id: data.question_paper_id,
    }


    await vine.validate({schema: rules, data: state})

    const user: any = await auth.user!.getRoleInstance();

    const batch = await Batch.query().where('uuid', data.batch_id).firstOrFail();
    const questionPaper = await QuestionPaper.query().where('uuid', data.question_paper_id).firstOrFail();

    const payload = {
      teacher_id: user.id,
      serial_no: data.serial_no,
      name: data.name,
      batch_id: batch.id,
      question_paper_id: questionPaper.id,
    }


    await Exam.create(payload);

    return response.status(200).send({
      status: 'success',
      message: 'Exam created successfully',
    });
  }
}
