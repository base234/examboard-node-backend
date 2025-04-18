import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'question_paper_questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('question_paper_id').unsigned().nullable();
      table.foreign('question_paper_id').references('id').inTable('question_papers').onDelete('CASCADE');

      table.integer('questions_bank_id').unsigned().nullable();
      table.foreign('questions_bank_id').references('id').inTable('questions_bank').onDelete('CASCADE');

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
