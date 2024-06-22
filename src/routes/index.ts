import { Router } from 'express'
import { index } from '@/controllers/BaseController'
import { findUserById, createUser, editUser, removeUser } from '@/controllers/UsersController'
import { createContent, removeContent } from '@/controllers/ContentsController'
import { createTheme, removeTheme } from '@/controllers/ThemesController'
import {
  findStudentsByUserId,
  findStudentById,
  createStudent,
  editStudent,
  removeStudent
} from '@/controllers/StudentsController'
const router = Router()

router.get('/', index)

// Users CRUD
router.get('/users/:id', findUserById)
router.post('/users', createUser)
router.put('/users/:id', editUser)
router.delete('/users/:id', removeUser)

router.post('/contents/:userId', createContent)
router.delete('/contents/:userId/:id', removeContent)

router.post('/themes/:userId', createTheme)
router.delete('/themes/:userId/:id', removeTheme)

// Students CRUD
router.get('/students/:userId', findStudentsByUserId)
router.get('/students/:userId/:id', findStudentById)
router.post('/students', createStudent)
router.put('/students/:id', editStudent)
router.delete('/students/:id', removeStudent)

export default router
