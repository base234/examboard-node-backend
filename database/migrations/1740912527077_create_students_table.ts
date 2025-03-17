import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('teacher_id').unsigned().notNullable();
      table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE');

      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('email', 254).notNullable()
      table.string('phone_number').nullable()

      table.boolean('is_email_verified').defaultTo(true).notNullable()
      table.boolean('is_phone_number_verified').defaultTo(true).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
