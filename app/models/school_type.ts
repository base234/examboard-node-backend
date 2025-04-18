import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import SchoolLevel from '#models/school_level'
import SchoolClass from '#models/school_class'
import Batch from './batch.js'

export default class SchoolType extends BaseModel {
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
  static assignUuid(school_level: SchoolType) {
    school_level.uuid = crypto.randomUUID()
  }

  @hasMany(() => SchoolLevel, { foreignKey: 'school_type_id' })
  declare school_levels: HasMany<typeof SchoolLevel>

  @hasMany(() => SchoolClass, { foreignKey: 'school_type_id' })
  declare school_classes: HasMany<typeof SchoolClass>

  @hasMany(() => Batch, { foreignKey: 'school_type_id' })
  declare batches: HasMany<typeof Batch>
}
