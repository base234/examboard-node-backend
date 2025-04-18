import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import SchoolType from '#models/school_type'
import SchoolLevel from '#models/school_level'
import Batch from './batch.js'

export default class SchoolClass extends BaseModel {
  public static table = 'school_classes';

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare school_type_id: number
  @belongsTo(() => SchoolType, { foreignKey: 'school_type_id' })
  declare school_type: BelongsTo<typeof SchoolType>

  @column()
  declare school_level_id: number
  @belongsTo(() => SchoolLevel, { foreignKey: 'school_level_id' })
  declare school_level: BelongsTo<typeof SchoolLevel>

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
  static assignUuid(school_class: SchoolClass) {
    school_class.uuid = crypto.randomUUID()
  }

    @hasMany(() => Batch, { foreignKey: 'school_class_id' })
    declare batches: HasMany<typeof Batch>
}
