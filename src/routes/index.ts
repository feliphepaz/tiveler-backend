import { Router } from 'express'
import { index } from '@/controllers/BaseController'
import { findUserById, createUser, editUser, removeUser } from '@/controllers/users/UsersController'
import {
  createContentInUser,
  removeContentInUser
} from '@/controllers/users/UserContentsController'
import {
  findStudentsByUserId,
  findStudentById,
  createStudent,
  editStudent,
  removeStudent
} from '@/controllers/students/StudentsController'
import {
  createContentInStudent,
  handleContentInStudent,
  removeContentInStudent
} from '@/controllers/students/StudentContentsController'
import {
  findLessonById,
  createLessonInStudent,
  editLessonInStudent,
  removeLessonInStudent
} from '@/controllers/students/StudentLessonsController'
const router = Router()

router.get('/', index)

// Users CRUD
router.get('/users/:id', findUserById)
router.post('/users', createUser)
router.put('/users/:id', editUser)
router.delete('/users/:id', removeUser)

router.post('/users/contents/:userId', createContentInUser)
router.delete('/users/contents/:userId/:id', removeContentInUser)

// Students CRUD
router.get('/students/:userId', findStudentsByUserId)
router.get('/students/:userId/:id', findStudentById)
router.post('/students', createStudent)
router.put('/students/:id', editStudent)
router.delete('/students/:id', removeStudent)

router.post('/students/contents/:studentId', createContentInStudent)
router.put('/students/contents/:studentId/:id', handleContentInStudent)
router.delete('/students/contents/:studentId/:id', removeContentInStudent)

router.get('/students/lessons/:studentId/:id', findLessonById)
router.post('/students/lessons/:studentId', createLessonInStudent)
router.put('/students/lessons/:studentId/:id', editLessonInStudent)
router.delete('/students/lessons/:studentId/:id', removeLessonInStudent)

export default router
