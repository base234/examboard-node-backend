import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import SubjectCategory from '#models/subject_category'

export default class Subject extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare subject_category_id: number
  @belongsTo(() => SubjectCategory, { foreignKey: 'subject_category_id' })
  declare subject_category: BelongsTo<typeof SubjectCategory>

  @column()
  declare flag: string

  @column()
  declare display_flag: string

  @column()
  declare short_name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(subject: Subject) {
    subject.uuid = crypto.randomUUID()
  }
}
