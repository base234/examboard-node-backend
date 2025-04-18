import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'question_papers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('teacher_id').unsigned().nullable();
      table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE');

      table.string('no').nullable().unique();
      table.string('code').nullable();

      table.integer('type_of_assessment_id').unsigned().nullable();
      table.foreign('type_of_assessment_id').references('id').inTable('type_of_assessments').onDelete('CASCADE');

      table.string('name').nullable();
      table.integer('total_marks').nullable();
      table.integer('duration').unsigned().nullable();

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
