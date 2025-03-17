import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeCreate, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Student from '#models/student'
import Teacher from '#models/teacher'
import type { HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare first_name: string | null

  @column()
  declare last_name: string | null

  @column()
  declare role: 'student' | 'teacher' | 'admin' | 'superadmin'

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  static get hidden() {
    return ['password']
  }

  @column()
  declare phone_number: string

  @column()
  declare is_email_verified: boolean

  @column()
  declare is_phone_number_verified: boolean

  @column()
  declare is_onboarding_complete: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(user: User) {
    user.uuid = crypto.randomUUID()
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasOne(() => Teacher, { foreignKey: 'user_id' })
  declare teacher: HasOne<typeof Teacher>

  // @hasOne(() => Admin, { foreignKey: 'user_id' })
  // declare admin: HasOne<typeof Admin>

  public async getRoleInstance() {
    switch (this.role) {
      case 'student':
        return await Student.findOrFail(this.id)
      case 'teacher':
        return await Teacher.findOrFail(this.id)
      default:
        return null
    }
  }
}
