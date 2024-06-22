import { Router } from 'express'
import { index } from '@/controllers/BaseController'
import { findUserById, createUser, editUser, removeUser } from '@/controllers/UsersController'
import { createContent, removeContent } from '@/controllers/ContentsController'
import { createTheme, removeTheme } from '@/controllers/ThemesController'
const router = Router()

router.get('/', index)

// Users CRUD
router.get('/users/:id', findUserById)
router.post('/users', createUser)
router.put('/users/:id', editUser)
router.delete('/users/:id', removeUser)

// Contents CD
router.post('/contents/:userId', createContent)
router.delete('/contents/:userId/:contentId', removeContent)

// Themes CD
router.post('/themes/:userId', createTheme)
router.delete('/themes/:userId/:themeId', removeTheme)

export default router
