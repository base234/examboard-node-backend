import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'

import QuestionPaper from '#models/question_paper'
import QuestionsBank from '#models/questions_bank'

export default class QuestionPaperQuestion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare question_paper_id: number
  @belongsTo(() => QuestionPaper)
  declare question_papers: BelongsTo<typeof QuestionPaper>

  @column()
  declare questions_bank_id: number
  @belongsTo(() => QuestionsBank)
  declare questions_bank: BelongsTo<typeof QuestionsBank>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(question_paper_question: QuestionPaperQuestion) {
    question_paper_question.uuid = crypto.randomUUID()
  }
}
