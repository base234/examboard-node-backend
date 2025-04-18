import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'batches'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {

      table.integer('subject_id').unsigned().nullable().after('teacher_id');
      table.foreign('subject_id').references('id').inTable('subjects').onDelete('CASCADE');

      table.integer('school_class_id').unsigned().nullable().after('teacher_id');
      table.foreign('school_class_id').references('id').inTable('school_classes').onDelete('CASCADE');

      table.integer('school_level_id').unsigned().nullable().after('teacher_id');
      table.foreign('school_level_id').references('id').inTable('school_levels').onDelete('CASCADE');

      table.integer('school_type_id').unsigned().nullable().after('teacher_id');
      table.foreign('school_type_id').references('id').inTable('school_types').onDelete('CASCADE');
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('school_type_id')
      table.dropForeign('school_level_id')
      table.dropForeign('school_class_id')
      table.dropForeign('subject_id')
      table.dropColumn('school_type_id')
      table.dropColumn('school_level_id')
      table.dropColumn('school_class_id')
      table.dropColumn('subject_id')
    })
  }
}
