import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'

import Batch from '#models/batch'
import Student from '#models/student'

export default class BatchStudent extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare batch_id: number
  @belongsTo(() => Batch)
  declare batch: BelongsTo<typeof Batch>

  @column()
  declare student_id: number
  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
