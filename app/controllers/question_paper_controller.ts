import type { HttpContext } from '@adonisjs/core/http'

import QuestionPaper from '#models/question_paper';
import QuestionPaperTransformer from '#transformers/QuestionPaperTransformer';
import vine from '@vinejs/vine';
import QuestionPaperQuestion from '#models/question_paper_question';
import QuestionsBank from '#models/questions_bank';

export default class QuestionPaperController {
  async index({ response }: HttpContext) {
    const questionPapers = await QuestionPaper.query().orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Question Papers fetched successfully',
      data: await QuestionPaperTransformer.collection(questionPapers)
    });
  }

  async show({ params, request, response }: HttpContext) {
    const { isShowQuestions } = request.qs();

    const { id } = params;
    const questionPaper = await QuestionPaper.query().where('uuid', id).firstOrFail();

    return response.status(200).send({
      status: 'success',
      message: 'Question Paper fetched successfully',
      data: await QuestionPaperTransformer.transform(questionPaper, isShowQuestions),
    })
  }

  async store({ auth, request, response }: HttpContext) {
    const { data } = request.all();

    const rules = vine.object({
      no: vine.string().unique({ table: 'question_papers', column: 'no' }),
      name: vine.string(),
      code: vine.string(),
      total_marks: vine.number().withoutDecimals(),
      duration: vine.number().withoutDecimals(),
    })

    const state = {
      no: data.paper_no,
      name: data.paper_name,
      code: data.paper_code,
      total_marks: data.paper_total_marks,
      duration: data.paper_duration,
    }

    await vine.validate({schema: rules, data: state})

    const user: any = await auth.user!.getRoleInstance();

    const payload = {
      teacher_id: user.id,
      no: data.paper_no,
      code: data.paper_code,
      name: data.paper_name,
      total_marks: data.paper_total_marks,
      duration: data.paper_duration * 60,
    }

    await QuestionPaper.create(payload);

    return response.status(200).send({
      status: 'success',
      message: 'Paper created successfully',
    });
  }

  async storeQuestion({ params, response }: HttpContext) {
    const questionPaperId = params.id;
    const questionId = params.question_id;

    const questionPaper = await QuestionPaper.query().where('uuid', questionPaperId).firstOrFail();

    if (!questionPaper) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    const question = await QuestionsBank.query().where('uuid', questionId).firstOrFail();

    if (!question) {
      return response.status(401).send({
        status: 'error',
        message: 'Student not found!',
      });
    }

    let questionPaperQuestion = await QuestionPaperQuestion.query().where({
      'question_paper_id': questionPaper.id,
      'questions_bank_id': question.id
    }).first();

    if (questionPaperQuestion) {
      return response.status(401).send({
        status: 'error',
        message: 'Question already added to the Question Paper!',
      });
    }

    await QuestionPaperQuestion.create({
      'question_paper_id': questionPaper.id,
      'questions_bank_id': question.id,
    });

    return response.status(200).send({
      status: 'success',
      message: 'Question added successfully'
    });
  }

  async destroyQuestion({ params, response }: HttpContext) {
    const questionPaperId = params.id;
    const questionId = params.question_id;

    if (!questionPaperId) {
      return response.status(401).send({
        status: 'error',
        message: 'Question Paper not found!',
      });
    }

    const questionPaper = await QuestionPaper.query().where('uuid', questionPaperId).firstOrFail();

    const question = await QuestionsBank.query().where('uuid', questionId).firstOrFail();

    let questionPaperQuestion = await QuestionPaperQuestion.query().where({
      'question_paper_id': questionPaper.id,
      'questions_bank_id': question.id
    }).first();

    if (!questionPaperQuestion) {
      return response.status(401).send({
        status: 'error',
        message: 'Question not found in the Question Paper!',
      });
    }

    await questionPaperQuestion.delete();

    return response.status(200).send({
      status: 'success',
      message: 'Question removed successfully'
    });
  }
}
