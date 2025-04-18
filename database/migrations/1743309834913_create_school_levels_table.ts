import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'school_levels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('school_type_id').unsigned().notNullable();
      table.foreign('school_type_id').references('id').inTable('school_types').onDelete('CASCADE');

      table.string('flag').notNullable();
      table.string('display_flag').notNullable();
      table.string('short_name').notNullable();

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
