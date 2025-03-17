import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TypeOfQuestion from '#models/type_of_question';

export default class extends BaseSeeder {
  async run() {
    await TypeOfQuestion.createMany([
      {
        flag: 'mcq',
        display_flag: 'Multiple Choice Question',
        shorthand: 'MCQ',
      },
      {
        flag: 'mas',
        display_flag: 'Multiple Answers Question',
        shorthand: 'MAS',
      },
      {
        flag: 'tf',
        display_flag: 'True or False',
        shorthand: 'TF',
      },
      {
        flag: 'fib',
        display_flag: 'Fill in the Blanks',
        shorthand: 'FIB',
      },
      {
        flag: 'mtf',
        display_flag: 'Match the follwing',
        shorthand: 'MTF',
      },
      {
        flag: 'ords',
        display_flag: 'Ordering in Sequence',
        shorthand: 'ORDS',
      },
      {
        flag: 'satq',
        display_flag: 'Short Answer Type Question',
        shorthand: 'SATQ',
      },
      {
        flag: 'latq',
        display_flag: 'Long Answer Type Question',
        shorthand: 'LATQ',
      },
    ])
  }
}
