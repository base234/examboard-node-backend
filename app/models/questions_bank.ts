import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

import Teacher from '#models/teacher'
import TypeOfSchool from '#models/type_of_school'
import TypeOfQuestion from '#models/type_of_question'
import QuestionPaper from '#models/question_paper'

export default class QuestionsBank extends BaseModel {
  public static table = 'questions_bank';

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare teacher_id: number

  @column()
  declare is_created_by_user: boolean

  @column()
  declare type_of_school_id: number

  @column()
  declare type_of_question_id: number

  @column()
  declare question: string

  @column({
    serializeAs: 'options',
    prepare: (value: any) => JSON.stringify(value),  // Ensure JSON format when inserting
    serialize: (value: string) => JSON.parse(value), // Ensure it's returned as an array
  })
  declare options: []

  @column({
    serializeAs: 'answer_options',
    prepare: (value: any) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  declare answer_options: []

  @column()
  declare answer_paragraph: string

  @column()
  declare explanation: string

  @column()
  declare difficulty: string

  @column()
  declare marks: number

  @column()
  declare duration: number

  @column()
  declare note: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(questions_bank: QuestionsBank) {
    questions_bank.uuid = crypto.randomUUID()
  }

  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @belongsTo(() => TypeOfQuestion, { foreignKey: 'type_of_question_id' })
  declare type_of_question: BelongsTo<typeof TypeOfQuestion>

  @belongsTo(() => TypeOfSchool, { foreignKey: 'type_of_school_id' })
  declare type_of_school: BelongsTo<typeof TypeOfSchool>

  @manyToMany(() => QuestionPaper, {
    pivotTable: 'question_paper_questions',
  })
  declare question_papers: ManyToMany<typeof QuestionPaper>
}
