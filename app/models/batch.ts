import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import crypto from 'crypto'

import Teacher from '#models/teacher'
import Student from '#models/student'
import TypeOfSchool from '#models/type_of_school'

export default class Batch extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare teacher_id: number

  @column()
  declare type_of_school_id: number

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

  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @belongsTo(() => TypeOfSchool, { foreignKey: 'type_of_school_id' })
  declare type_of_school: BelongsTo<typeof TypeOfSchool>

  @manyToMany(() => Student, {
    pivotTable: 'batch_students',
  })
  declare students: ManyToMany<typeof Student>
}
