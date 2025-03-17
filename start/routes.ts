/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import AuthController from '#controllers/auth_controller'
import StudentController from '#controllers/students_controller'
import BatchController from '#controllers/batch_controller'
import { middleware } from './kernel.js'
import TypeOfSchoolController from '#controllers/type_of_school_controller'
import TypeOfQuestionController from '#controllers/type_of_question_controller'
import QuestionsBanksController from '#controllers/questions_banks_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/auth/register', [AuthController, 'register']).as('auth.register');
router.post('/auth/login', [AuthController, 'login']).as('auth.login');
router.delete('/auth/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth());
router.get('/me', [AuthController, 'me']).as('auth.me');

// Students
router.group(() => {
  router.get('/students', [StudentController, 'index'])
  router.post('/students', [StudentController, 'store'])
  router.get('/students/:id', [StudentController, 'show'])
  router.put('/students/:id', [StudentController, 'update'])
  router.delete('/students/:id', [StudentController, 'destroy'])
}).use(middleware.auth());

// Batches
router.group(() => {
  router.get('/batches', [BatchController, 'index'])
  router.post('/batches', [BatchController, 'store'])
  router.post('/batches/:id/students/:student_id', [BatchController, 'storeStudent'])
  router.get('/batches/:id', [BatchController, 'show'])
  router.put('/batches/:id', [BatchController, 'update'])
  router.delete('/batches/:id', [BatchController, 'destroy'])
  router.delete('/batches/:id/students/:student_id', [BatchController, 'destroyStudent'])
}).use(middleware.auth());

// Type of schools
router.group(() => {
  router.get('/type-of-schools', [TypeOfSchoolController, 'index'])
  router.get('/type-of-schools/:id', [TypeOfSchoolController, 'show'])
}).use(middleware.auth());

// Type of schools
router.group(() => {
  router.get('/type-of-questions', [TypeOfQuestionController, 'index'])
  router.get('/type-of-questions/:id', [TypeOfQuestionController, 'show'])
}).use(middleware.auth());

// Questions banks
router.group(() => {
  router.get('/questions-bank', [QuestionsBanksController, 'index'])
  router.post('/questions-bank', [QuestionsBanksController, 'store'])
}).use(middleware.auth());

router.post('/api/upload-pdf', '#controllers/pdf_controller.upload')
router.get('/api/stream-response/:requestId', '#controllers/pdf_controller.streamResponse')
