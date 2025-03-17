import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Teacher from './teacher.js'
import TypeOfSchool from './type_of_school.js'
import TypeOfQuestion from './type_of_question.js'

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
}
