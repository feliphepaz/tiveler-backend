import { Router } from 'express'
import { index, create, remove, edit } from '@/controllers/UsersController'
const router = Router()

// Users CRUD
router.get('/', index)
router.post('/users', create)
router.put('/users/:id', edit)
router.delete('/users/:id', remove)

export default router
