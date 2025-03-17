import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TypeOfQuestion from '#models/type_of_question';
import TypeOfSchool from '#models/type_of_school';

export default class extends BaseSeeder {
  async run() {
    await TypeOfSchool.createMany([
      { flag: 'school', display_flag: 'School' },
      { flag: 'college', display_flag: 'College' },
      { flag: 'college-pg', display_flag: 'College (PG)' },
      { flag: 'phd', display_flag: 'Doctor of Philosophy' },
    ])
  }
}
