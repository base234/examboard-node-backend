import { BaseSeeder } from '@adonisjs/lucid/seeders';
import TypeOfAssessment from '#models/type_of_assessment';

export default class extends BaseSeeder {
  async run() {
    await TypeOfAssessment.createMany([
      { flag: 'exam', display_flag: 'Exam', description: 'Formal, comprehensive evaluation (midterm, final, etc)' },
    ])
  }
}
