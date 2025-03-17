import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'batches'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('type_of_school_id').unsigned().notNullable().after('teacher_id');
      table.foreign('type_of_school_id').references('id').inTable('type_of_schools').onDelete('CASCADE');
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('type_of_school_id')
      table.dropColumn('type_of_school_id')
    })
  }
}
