import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions_bank'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('teacher_id').unsigned().notNullable();
      table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE');

      table.boolean('is_created_by_user').defaultTo(true).notNullable()

      table.integer('type_of_school_id').unsigned();
      table.foreign('type_of_school_id').references('id').inTable('type_of_schools').onDelete('CASCADE');

      table.integer('type_of_question_id').unsigned();
      table.foreign('type_of_question_id').references('id').inTable('type_of_questions').onDelete('CASCADE');

      table.text('question', 'longtext').notNullable()
      table.json('options').nullable()

      table.json('answer_options').nullable()
      table.text('answer_paragraph', 'longtext').nullable()

      table.text('explanation', 'longtext').nullable()
      table.string('difficulty').nullable().defaultTo('unknown')
      table.integer('marks').unsigned().notNullable().defaultTo(0)
      table.integer('duration').nullable().unsigned().defaultTo(0)
      table.text('note', 'mediumtext').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
