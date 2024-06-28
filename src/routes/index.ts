import { Router } from 'express'
import { index } from '@/controllers/BaseController'
import { findUserById, createUser, editUser, removeUser } from '@/controllers/UsersController'
import { createContentInUser, removeContentInUser } from '@/controllers/UserContentsController'
import { createThemeInUser, removeThemeInUser } from '@/controllers/UserThemesController'
import {
  findStudentsByUserId,
  findStudentById,
  createStudent,
  editStudent,
  removeStudent
} from '@/controllers/StudentsController'
import {
  createContentInStudent,
  handleContentInStudent,
  removeContentInStudent
} from '@/controllers/StudentContentsController'
import {
  findLessonById,
  createLessonInStudent,
  editLessonInStudent,
  removeLessonInStudent
} from '@/controllers/StudentLessonsController'
const router = Router()

router.get('/', index)

// Users CRUD
router.get('/users/:id', findUserById)
router.post('/users', createUser)
router.put('/users/:id', editUser)
router.delete('/users/:id', removeUser)

router.post('/users/contents/:userId', createContentInUser)
router.delete('/users/contents/:userId/:id', removeContentInUser)

router.post('/users/themes/:userId', createThemeInUser)
router.delete('/users/themes/:userId/:id', removeThemeInUser)

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
