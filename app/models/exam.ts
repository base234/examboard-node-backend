import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Batch from '#models/batch'
import QuestionPaper from '#models/question_paper'
import Teacher from '#models/teacher'

export default class Exam extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare teacher_id: number
  @belongsTo(() => Teacher, { foreignKey: 'teacher_id' })
  declare teacher: BelongsTo<typeof Teacher>

  @column()
  declare serial_no: string

  @column()
  declare name: string

  @column()
  declare batch_id: number
  @belongsTo(() => Batch, { foreignKey: 'batch_id' })
  declare batches: BelongsTo<typeof Batch>

  @column()
  declare question_paper_id: number
  @belongsTo(() => QuestionPaper, { foreignKey: 'question_paper_id' })
  declare question_papers: BelongsTo<typeof QuestionPaper>

  @column()
  declare duration: number

  @column.dateTime()
  declare start_time: DateTime

  @column.dateTime()
  declare end_time: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(exam: Exam) {
    exam.uuid = crypto.randomUUID()
  }
}
