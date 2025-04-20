import User from '#models/User'
import Teacher from '#models/teacher'

import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/UserTransformer';
import ExamCandidate from '#models/exam_candidate';

export default class AuthController {

  async register({ request, response }: HttpContext) {
    const { data } = await request.validateUsing(registerValidator);

    const user = await User.create(data);

    await Teacher.create({
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });

    const tokenData = await User.accessTokens.create(user, ['*'], { name: 'auth_register', expiresIn: '7 days' });

    if (!tokenData) {
      return response.status(500).send({
        status: 'error',
        message: 'Failed to register user!',
      })
    }

    return response.status(200).send({
      status: 'success',
      message: 'Registered successfully',
    })
  }

  async login({ request, response }: HttpContext) {
    const { data } = await request.validateUsing(loginValidator);

    // First check if the user exists
    const userExists = await User.findBy('email', data.email);
    if (!userExists) {
      return response.status(401).send({
        status: 'error',
        message: 'User not found!',
      });
    }

    try {
      const user = await User.verifyCredentials(data.email, data.password);
      const tokenData = await User.accessTokens.create(user, ['*'], { name: 'auth_login', expiresIn: '7 days' });

      if (!tokenData) {
        return response.status(500).send({
          status: 'error',
          message: 'Failed to login user!',
        })
      }

      return response.status(200).send({
        status: 'success',
        message: 'Logged in successfully',
        token: tokenData.value!.release(),
        data: await UserTransformer.transform(user),
      });
    } catch (error) {
      console.error('Authentication error:', error);
      return response.status(401).send({
        status: 'error',
        message: 'Invalid credentials!',
      });
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    return response.status(200).send({
      status: 'success',
      message: 'Logged out successfully',
    });
  }

  async me({ response, auth }: HttpContext) {
    await auth.check();

    if (!auth.isAuthenticated) {
      return response.status(401).send({
        status: 'error',
        message: 'Unauthorized!',
      })
    }

    const user_data = auth.user!

    return response.status(200).send({
      status: 'success',
      data: await UserTransformer.transform(user_data),
    });
  }

  async candidateLogin({ params, response }: HttpContext) {
    const { id } = params;

    const candidate = await ExamCandidate.query().where('uuid', id).firstOrFail();

    if (candidate.candidate_password !== candidate.candidate_id) {
      return response.status(401).send({
        status: 'error',
        message: 'Invalid credentials!',
      });
    }

    return response.status(200).send({
      status: 'success',
      message: 'Login successful',
    });
  }
}
