import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subjects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('subject_category_id').unsigned().nullable();
      table.foreign('subject_category_id').references('id').inTable('subject_categories').onDelete('CASCADE');

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
