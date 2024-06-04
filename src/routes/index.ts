import { Router } from 'express'
import { index, create, del } from '@/controllers/UsersController'
const router = Router()

router.get('/', index)
router.post('/users', create)
router.delete('/users/:id', del)

export default router
