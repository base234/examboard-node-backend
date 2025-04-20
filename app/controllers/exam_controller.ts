import type { HttpContext } from '@adonisjs/core/http'

import Exam from '#models/exam';
import ExamTransformer from '#transformers/ExamTransformer';
import vine from '@vinejs/vine';
import Batch from '#models/batch';
import QuestionPaper from '#models/question_paper';
import { DateTime } from 'luxon';
import ExamCandidate from '#models/exam_candidate';
import hash from '@adonisjs/core/services/hash'

import { generateUniqueCode } from '../helpers/UniqueCode.js'

export default class ExamController {
  async index({ response }: HttpContext) {
    const exams = await Exam.query()
      .preload('batches')
      .preload('question_papers')
      .orderBy('created_at', 'asc')
      .exec();

    return response.status(200).send({
      status: 'success',
      message: 'Exams fetched successfully',
      data: await ExamTransformer.collection(exams)
    });
  }

  async show({ params, response }: HttpContext) {
    const { id } = params;

    const exam = await Exam.query().where('uuid', id).preload('batches').preload('question_papers').firstOrFail();

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

  async storeExamLoginCredentials({ params, response }: HttpContext) {
    const { id } = params;

    const exam = await Exam.query().where('uuid', id).preload('batches').preload('question_papers').firstOrFail();
    const batch = await Batch.query().where('uuid', exam.batches.uuid).preload('students').firstOrFail();

    let batchStudents: Array<any> = [];

    for (const student of batch.students) {
      batchStudents.push({
        exam_id: exam.id,
        student_id: student.id,
        candidate_id: generateUniqueCode(),
        candidate_password: '12345678', // Default password
        terms_accepted: null,
        login_attempts: [],
        login_timestamps: [],
        candidate_end_time: null,
        is_survey_completed: false,
      });
    }

    await ExamCandidate.createMany(batchStudents);

    return response.status(200).send({
      status: 'success',
      message: 'Exam Login Credentials created successfully',
    });
  }

  async update({ params, request, response }: HttpContext) {
      const { id } = params;
      const { data } = request.all();

      const exam = await Exam.query().where('uuid', id).firstOrFail();

      if ('start_datetime' in data) {
        exam.start_time = DateTime.fromISO(data.start_datetime);
        if('duration' in data) {
          exam.end_time = exam.start_time.plus({ seconds: data.duration });
        }
      }

      await exam.save();

      return response.status(200).send({
        status: 'success',
        message: 'Exam schedule updated successfully',
      });
  }

  async destroy({ params, response }: HttpContext) {
    const { id } = params;

    const exam = await Exam.query().where('uuid', id).firstOrFail();
    await exam.delete();

    return response.status(200).send({
      status: 'success',
      message: 'Exam deleted successfully',
    });
  }
}
