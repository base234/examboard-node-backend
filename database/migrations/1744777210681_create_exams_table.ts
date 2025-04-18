import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('teacher_id').unsigned().nullable();
      table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE');

      table.string('serial_no').nullable().unique();

      table.string('name').nullable();

      table.integer('batch_id').unsigned().nullable();
      table.foreign('batch_id').references('id').inTable('batches').onDelete('CASCADE');

      table.integer('question_paper_id').unsigned().nullable();
      table.foreign('question_paper_id').references('id').inTable('question_papers').onDelete('CASCADE');

      table.integer('duration').unsigned().nullable();

      table.dateTime('start_time').nullable();
      table.dateTime('end_time').nullable();

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
