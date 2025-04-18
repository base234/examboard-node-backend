import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'type_of_assessments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.string('flag').notNullable();
      table.string('display_flag').notNullable();
      table.string('description').notNullable();

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
