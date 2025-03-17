import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()

      table.string('uuid').notNullable().unique();

      table.string('first_name').nullable()

      table.string('last_name').nullable()

      table.string('email', 254).notNullable().unique()

      table.enu('role', ['teacher', 'student', 'admin', 'superadmin']).defaultTo('teacher')

      table.string('password').notNullable()

      table.string('phone_number').nullable()

      table.boolean('is_email_verified').defaultTo(false)

      table.boolean('is_phone_number_verified').defaultTo(false)

      table.boolean('is_onboarding_complete').defaultTo(false)

      table.timestamp('created_at').notNullable()

      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
