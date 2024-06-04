import { Router } from 'express'
import { index, create, remove } from '@/controllers/UsersController'
const router = Router()

router.get('/', index)
router.post('/users', create)
router.delete('/users/:id', remove)

export default router
