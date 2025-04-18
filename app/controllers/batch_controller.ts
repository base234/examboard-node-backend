import Batch from '#models/batch';
import BatchStudent from '#models/batch_student';
import SchoolClass from '#models/school_class';
import SchoolLevel from '#models/school_level';
import SchoolType from '#models/school_type';
import Student from '#models/student';
import Subject from '#models/subject';
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

    const batch_data = await Batch.query().where({
      teacher_id: roleInstance.id,
      name: data.name,
    }).first();

    if (batch_data) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch with same name already exists!',
      });
    }

    const schoolType = await SchoolType.query().where('uuid', data.school_type_id).firstOrFail();
    const schoolLevel = await SchoolLevel.query().where('uuid', data.school_level_id).firstOrFail();
    const schoolClass = await SchoolClass.query().where('uuid', data.school_class_id).firstOrFail();
    const subject = await Subject.query().where('uuid', data.subject_id).firstOrFail();

    const payload = {
      teacher_id: roleInstance.id,
      school_type_id: schoolType.id,
      school_level_id: schoolLevel.id,
      school_class_id: schoolClass.id,
      subject_id: subject.id,
      name: data.name,
      description: data.description,
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

    if (!batchId) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    const batch = await Batch.query().where('uuid', batchId).firstOrFail();

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

    const batch = await Batch.query().where('uuid', batchId).firstOrFail();

    if (!batch) {
      return response.status(401).send({
        status: 'error',
        message: 'Batch not found!',
      });
    }

    // const batch = new Batch();

    if ('school_type_id' in data) {
      const schoolType = await SchoolType.query().where('uuid', data.school_type_id).firstOrFail();
      batch.school_type_id = schoolType.id;
    }

    if ('school_level_id' in data) {
      const schoolLevel = await SchoolLevel.query().where('uuid', data.school_level_id).firstOrFail();
      batch.school_level_id = schoolLevel.id;
    }

    if ('school_class_id' in data) {
      const schoolClass = await SchoolClass.query().where('uuid', data.school_class_id).firstOrFail();
      batch.school_class_id = schoolClass.id;
    }

    if ('subject_id' in data) {
      const subject = await Subject.query().where('uuid', data.subject_id).firstOrFail();
      batch.subject_id = subject.id;
    }

    // if ('name' in data) {
    //   batch.name = data.name;
    // }

    // if ('description' in data) {
    //   batch.description = data.description;
    // }

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
