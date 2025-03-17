import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, manyToMany, beforeCreate } from '@adonisjs/lucid/orm'
import crypto from 'crypto'

import Batch from '#models/batch'
import Teacher from '#models/teacher'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare teacher_id: number

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(student: Student) {
    student.uuid = crypto.randomUUID()
  }

  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @manyToMany(() => Batch, {
    pivotTable: 'batch_students',
  })
  declare batches: ManyToMany<typeof Batch>

  public async full_name() {
    return this.first_name + ' ' + this.last_name;
  }
}
