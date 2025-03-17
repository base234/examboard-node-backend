import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import crypto from 'crypto'

import User from '#models/User'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare user_id: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare first_name: string | null

  @column()
  declare last_name: string | null

  @column()
  declare email: string

  @column()
  declare phone_number: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(teacher: Teacher) {
    teacher.uuid = crypto.randomUUID()
  }

  public async full_name() {
    return this.first_name + ' ' + this.last_name;
  }
}
