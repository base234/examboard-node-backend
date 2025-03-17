import Batch from '#models/batch';
import BatchStudent from '#models/batch_student';
import Student from '#models/student';
import TypeOfSchool from '#models/type_of_school';
import BatchTransformer from '#transformers/BatchTransformer';
import type { HttpContext } from '@adonisjs/core/http'

export default class BatchController {
  async index({ auth, response }: HttpContext) {
    const batches = await Batch.query().where('teacher_id', auth.user!.id).orderBy('created_at', 'asc').exec();

    return response.status(200).send({
      status: 'success',
      message: 'Batches fetched successfully',
      data: await BatchTransformer.collection(batches)
    });
  }

  async show({ params, request, response }: HttpContext) {
    const { isShowStudents } = request.qs();

    const batch = await Batch.query().where('uuid', params.id).firstOrFail();

    return response.status(200).send({
      status: 'success',
      message: 'Batch fetched successfully',
      data: await BatchTransformer.transform(batch, isShowStudents),
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    let { data } = request.all();

    const roleInstance: any = await auth.user!.getRoleInstance();
    data.teacher_id = roleInstance.id;

    const batch_data = await Batch.query().where({
      teacher_id: roleInstance.id,
      name: data.name,
    }).first();

    if (batch_data) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch name already exists!',
      });
    }

    const typeOfSchool = await TypeOfSchool.query().where('uuid', data.type_of_school_id).first();

    const payload = {
      ...data,
      type_of_school_id: typeOfSchool?.id,
    };

    await Batch.create(payload);

    return response.status(200).send({
      status: 'success',
      message: 'Batch created successfully',
    });
  }

  async storeStudent({ params, response }: HttpContext) {
    const batchId = params.id;
    const studentId = params.student_id;

    const batch = await Batch.query().where('uuid', batchId).firstOrFail();

    if (!batch) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    const student = await Student.query().where('uuid', studentId).firstOrFail();

    if (!student) {
      return response.status(401).send({
        status: 'error',
        message: 'Student not found!',
      });
    }

    let batchStudent = await BatchStudent.query().where({
      'batch_id': batch.id,
      'student_id': student.id
    }).first();

    if (batchStudent) {
      return response.status(401).send({
        status: 'error',
        message: 'Student already added to the batch!',
      });
    }

    await BatchStudent.create({
      batch_id: batch.id,
      student_id: student.id,
    });

    return response.status(200).send({
      status: 'success',
      message: 'Student added successfully'
    });
  }

  async destroyStudent({ params, response }: HttpContext) {
    const batchId = params.id;
    const studentId = params.student_id;

    const batch = await Batch.query().where('uuid', batchId).firstOrFail();

    if (!batch) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    const student = await Student.query().where('uuid', studentId).firstOrFail();

    if (!student) {
      return response.status(401).send({
        status: 'error',
        message: 'Student not found!',
      });
    }

    let batchStudent = await BatchStudent.query().where({
      'batch_id': batch.id,
      'student_id': student.id
    }).first();

    if (!batchStudent) {
      return response.status(401).send({
        status: 'error',
        message: 'Student not found in the batch!',
      });
    }

    await batchStudent.delete();

    return response.status(200).send({
      status: 'success',
      message: 'Student removed successfully'
    });
  }

  async update({ params, request, response }: HttpContext) {
    const batchId = params.id;
    const { data } = request.all();

    if (!batchId) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    const batchData = await Batch.query().where('uuid', batchId).firstOrFail();

    if (batchData) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    const batch = new Batch();

    if ('name' in data) {
      batch.name = data.name;
    }

    if('type_of_school_id' in data) {
      batch.type_of_school_id = data.type_of_school_id;
    }

    if ('description' in data) {
      batch.description = data.description;
    }

    await batch.save();

    return response.status(200).send({
      status: 'success',
      message: 'Batch updated successfully'
    });
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const batchId = params.id;

    const batch = await Batch.query().where('uuid', batchId).firstOrFail();

    await batch.delete();

    return response.status(200).send({
      status: 'success',
      message: 'Batch deleted successfully',
    });
  }
}
