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
import SubjectCategoryController from '#controllers/subject_category_controller'
import SubjectController from '#controllers/subject_controller'
import SchoolTypeController from '#controllers/school_type_controller'
import SchoolLevelController from '#controllers/school_level_controller'
import SchoolClassController from '#controllers/school_class_controller'
import TypeOfAssessmentController from '#controllers/type_of_assessment_controller'
import QuestionPaperController from '#controllers/question_paper_controller'
import ExamController from '#controllers/exam_controller'
import CandidateAuthController from '#controllers/candidate_auth_controller'


router.get('/', async () => {
  return {
    message: 'Welcome to Examboard API Infrastructure',
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
  router.post('/batches/:id', [BatchController, 'update'])
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
  router.get(`/questions-bank/:id`, [QuestionsBanksController, 'show'])
  router.delete(`/questions-bank/:id`, [QuestionsBanksController, 'destroy']);
}).use(middleware.auth());

// Schools
router.group(() => {
  // Types
  router.get('/schools', [SchoolTypeController, 'index'])
  router.get('/schools/:uuid', [SchoolTypeController, 'show'])

  // Levels
  router.get('/schools/:uuid/levels', [SchoolLevelController, 'index'])
  router.get('/schools/:uuid/levels/:level_id', [SchoolLevelController, 'show'])

  // Classes
  router.get('/schools/:uuid/levels/:level_id/classes', [SchoolClassController, 'index'])
  router.get('/schools/:uuid/levels/:level_id/classes/:class-id', [SchoolClassController, 'show'])
}).use(middleware.auth());

// Subjects
router.group(() => {
  // Subject Categories
  router.get('/subject-categories', [SubjectCategoryController, 'index'])
  router.get('/subject-categories/:id', [SubjectCategoryController, 'show'])

  // Subjects
  router.get('/subjects', [SubjectController, 'index'])
  router.get('/subjects/:id', [SubjectController, 'show'])
}).use(middleware.auth());

// Type of Assessments
router.group(() => {
  router.get('/type-of-assessments', [TypeOfAssessmentController, 'index'])
  router.get('/type-of-assessments/:id', [TypeOfAssessmentController, 'show'])
}).use(middleware.auth());

// Exams
router.group(() => {
  router.get('/question-papers', [QuestionPaperController, 'index']);
  router.post('/question-papers', [QuestionPaperController, 'store']);
  router.get('/question-papers/:id', [QuestionPaperController, 'show']);
  router.get('/question-papers/:id/questions/:question_id', [QuestionPaperController, 'storeQuestion'])
  router.delete('/question-papers/:id/questions/:question_id', [QuestionPaperController, 'destroyQuestion'])
}).use(middleware.auth());

// Exams
router.group(() => {
  router.get('/exams', [ExamController, 'index'])
  router.post('/exams', [ExamController, 'store'])
  router.get('/exams/:id', [ExamController, 'show'])
  router.patch('/exams/:id', [ExamController, 'update'])
  router.delete('/exams/:id', [ExamController, 'destroy'])
  router.get('/exams/:id/exam-login-credentials', [ExamController, 'storeExamLoginCredentials'])
}).use(middleware.auth());

// Candidate authentication routes
router.post('/candidate/login', [CandidateAuthController, 'login'])
router.post('/candidate/logout', [CandidateAuthController, 'logout'])
router.post('/candidate/me', [CandidateAuthController, 'me'])

router.post('/api/upload-pdf', '#controllers/pdf_controller.upload')
router.get('/api/stream-response/:requestId', '#controllers/pdf_controller.streamResponse')
