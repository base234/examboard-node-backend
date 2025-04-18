import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class TypeOfAssessment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare flag: string

  @column()
  declare display_flag: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(type_of_assessment: TypeOfAssessment) {
    type_of_assessment.uuid = crypto.randomUUID()
  }

  @hasMany(() => TypeOfAssessment, { foreignKey: 'type_of_assessment_id' })
  declare papers: HasMany<typeof TypeOfAssessment>
}
