import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exam_candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('exam_id').unsigned().nullable();
      table.foreign('exam_id').references('id').inTable('exams').onDelete('CASCADE');

      table.integer('student_id').unsigned().nullable();
      table.foreign('student_id').references('id').inTable('students').onDelete('CASCADE');

      table.integer('question_paper_id').unsigned().nullable();
      table.foreign('question_paper_id').references('id').inTable('question_papers').onDelete('CASCADE');

      table.string('candidate_id').notNullable().unique();
      table.string('candidate_password', 255).notNullable();

      table.timestamp('terms_accepted').nullable();

      table.json('login_attempts').nullable();

      table.json('login_timestamps').nullable();

      table.timestamp('candidate_end_time').nullable();

      table.boolean('is_survey_completed').nullable();

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
