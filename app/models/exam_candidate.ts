import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import crypto from 'crypto'
import hash from '@adonisjs/core/services/hash'

import Student from '#models/student'
import Exam from '#models/exam'
import QuestionPaper from '#models/question_paper'

export default class ExamCandidate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare exam_id: number
  @belongsTo(() => Exam, { foreignKey: 'exam_id' })
  declare exam: BelongsTo<typeof Exam>

  @column()
  declare student_id: number
  @belongsTo(() => Student, { foreignKey: 'student_id' })
  declare student: BelongsTo<typeof Student>

  @column()
  declare question_paper_id: number
  @belongsTo(() => QuestionPaper, { foreignKey: 'question_paper_id' })
  declare question_paper: BelongsTo<typeof QuestionPaper>

  @column()
  declare candidate_id: string

  @column()
  declare candidate_password: string

  @column.dateTime()
  declare terms_accepted: DateTime

  @column({
    serializeAs: 'login_attempts',
    prepare: (value: boolean[]) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  declare login_attempts: boolean[]

  @column({
    serializeAs: 'login_timestamps',
    prepare: (value: string[]) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  declare login_timestamps: string[]

  @column.dateTime()
  declare candidate_end_time: DateTime

  @column()
  declare is_survey_completed: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(exam_candidate: ExamCandidate) {
    exam_candidate.uuid = crypto.randomUUID()
  }

  @beforeSave()
  static async hashPassword(examCandidate: ExamCandidate) {
    if (examCandidate.$dirty.candidate_password) {
      examCandidate.candidate_password = await hash.make(examCandidate.candidate_password)
    }
  }

  static async verifyCredentials(candidateId: string, password: string) {
    const candidate = await this.findBy('candidate_id', candidateId)
    if (!candidate) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await hash.verify(candidate.candidate_password, password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    return candidate
  }
}
