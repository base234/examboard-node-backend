import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'batches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().notNullable()
      table.uuid('uuid').notNullable().unique()

      table.integer('teacher_id').unsigned().notNullable();
      table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE');

      table.integer('school_type_id').unsigned().notNullable();
      table.foreign('school_type_id').references('id').inTable('school_types').onDelete('CASCADE');

      table.integer('school_level_id').unsigned().notNullable();
      table.foreign('school_level_id').references('id').inTable('school_levels').onDelete('CASCADE');

      table.integer('school_class_id').unsigned().notNullable();
      table.foreign('school_class_id').references('id').inTable('school_classes').onDelete('CASCADE');

      table.integer('subject_id').unsigned().notNullable();
      table.foreign('subject_id').references('id').inTable('subjects').onDelete('CASCADE');

      table.string('name').nullable()

      table.string('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
