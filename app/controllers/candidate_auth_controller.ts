import ExamCandidate from '#models/exam_candidate'
import type { HttpContext } from '@adonisjs/core/http'
import { createCandidateAuthValidator } from '#validators/candidate_auth'
import hash from '@adonisjs/core/services/hash'

export default class CandidateAuthController {
  async login({ request, response }: HttpContext) {
    try {
      const { candidate_id, password } = await request.validateUsing(createCandidateAuthValidator)

      const candidate = await ExamCandidate.query().where('candidate_id', candidate_id).firstOrFail();

      const isPasswordValid = await hash.verify(candidate.candidate_password, password);

      if (!isPasswordValid) {
        return response.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        })
      }

      // Update login attempts and timestamps
      const loginAttempts: boolean[] = candidate.login_attempts || []
      const loginTimestamps: string[] = candidate.login_timestamps || []

      loginAttempts.push(true)
      loginTimestamps.push(new Date().toISOString())

      await candidate.merge({
        login_attempts: loginAttempts,
        login_timestamps: loginTimestamps
      }).save()

      return response.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          candidate_id: candidate.candidate_id,
          exam_id: candidate.exam_id,
          student_id: candidate.student_id
        }
      })
    } catch (error) {
      if (error.messages) {
        return response.status(422).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.messages
        })
      }

      return response.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      })
    }
  }

  async me({ request, response }: HttpContext) {
    try {
      const { candidate_id } = request.body()

      const candidate = await ExamCandidate.query()
        .where('candidate_id', candidate_id)
        .preload('exam')
        .preload('student')
        .firstOrFail()

      return response.status(200).json({
        status: 'success',
        data: {
          candidate_id: candidate.candidate_id,
          exam: {
            id: candidate.exam.id,
            name: candidate.exam.name,
            start_time: candidate.exam.start_time,
            end_time: candidate.exam.end_time
          },
          student: {
            id: candidate.student.id,
            first_name: candidate.student.first_name,
            last_name: candidate.student.last_name
          },
          login_attempts: candidate.login_attempts?.length || 0,
          last_login: candidate.login_timestamps?.length ? candidate.login_timestamps[candidate.login_timestamps.length - 1] : null,
          terms_accepted: candidate.terms_accepted,
          is_survey_completed: candidate.is_survey_completed
        }
      })
    } catch (error) {
      return response.status(404).json({
        status: 'error',
        message: 'Candidate not found'
      })
    }
  }

  async logout({ request, response }: HttpContext) {
    const { candidate_id } = request.body()

    try {
      const candidate = await ExamCandidate.findBy('candidate_id', candidate_id)

      if (!candidate) {
        return response.status(404).json({
          status: 'error',
          message: 'Candidate not found'
        })
      }

      // Clear login attempts and timestamps
      await candidate.merge({
        login_attempts: [],
        login_timestamps: []
      }).save()

      return response.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Failed to logout'
      })
    }
  }
}
