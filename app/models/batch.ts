import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import crypto from 'crypto'

import Teacher from '#models/teacher'
import Student from '#models/student'
import SchoolType from '#models/school_type'
import SchoolLevel from '#models/school_level'
import SchoolClass from '#models/school_class'
import Subject from '#models/subject'

export default class Batch extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare teacher_id: number

  @column()
  declare school_type_id: number

  @column()
  declare school_level_id: number

  @column()
  declare school_class_id: number

  @column()
  declare subject_id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(batch: Batch) {
    batch.uuid = crypto.randomUUID()
  }

  @belongsTo(() => Teacher, { foreignKey: 'teacher_id' })
  declare teacher: BelongsTo<typeof Teacher>

  @belongsTo(() => SchoolType, { foreignKey: 'school_type_id' })
  declare school_type: BelongsTo<typeof SchoolType>

  @belongsTo(() => SchoolLevel, { foreignKey: 'school_level_id' })
  declare school_level: BelongsTo<typeof SchoolLevel>

  @belongsTo(() => SchoolClass, { foreignKey: 'school_class_id' })
  declare school_class: BelongsTo<typeof SchoolClass>

  @belongsTo(() => Subject, { foreignKey: 'subject_id' })
  declare subject: BelongsTo<typeof Subject>

  @manyToMany(() => Student, {
    pivotTable: 'batch_students',
  })
  declare students: ManyToMany<typeof Student>
}
