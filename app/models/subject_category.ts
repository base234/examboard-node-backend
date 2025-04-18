import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Subject from '#models/subject'

export default class SubjectCategory extends BaseModel {

  public static table = 'subject_categories';

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

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
  static assignUuid(subject: SubjectCategory) {
    subject.uuid = crypto.randomUUID()
  }

  @hasMany(() => Subject)
  declare subjects: HasMany<typeof Subject>
}
