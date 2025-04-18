import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import TypeOfAssessment from '#models/type_of_assessment'

import Teacher from "#models/teacher";
import QuestionsBank from "#models/questions_bank";

export default class QuestionPaper extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare teacher_id: number
  @belongsTo(() => Teacher, { foreignKey: 'teacher_id' })
  declare teacher: BelongsTo<typeof Teacher>

  @column()
  declare no: string

  @column()
  declare code: string

  @column()
  declare type_of_assessment_id: number
  @belongsTo(() => TypeOfAssessment, { foreignKey: 'type_of_assessment_id' })
  declare type_of_assessment: BelongsTo<typeof TypeOfAssessment>

  @column()
  declare name: string

  @column()
  declare total_marks: string

  @column()
  declare duration: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(question_paper: QuestionPaper) {
    question_paper.uuid = crypto.randomUUID()
  }

  @manyToMany(() => QuestionsBank, {
    pivotTable: 'question_paper_questions',
  })
  declare questions_bank: ManyToMany<typeof QuestionsBank>
}
