import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import SchoolType from '#models/school_type'
import SchoolClass from '#models/school_class'
import Batch from './batch.js'

export default class SchoolLevel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare school_type_id: number
  @belongsTo(() => SchoolType, { foreignKey: 'school_type_id' })
  declare school_type: BelongsTo<typeof SchoolType>

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
  static assignUuid(school_level: SchoolLevel) {
    school_level.uuid = crypto.randomUUID()
  }

  @hasMany(() => SchoolClass, { foreignKey: 'school_level_id' })
  declare school_classes: HasMany<typeof SchoolClass>

  @hasMany(() => Batch, { foreignKey: 'school_level_id' })
  declare batches: HasMany<typeof Batch>
}
