import { Router } from 'express'
import { index, create } from '@/controllers/UserController'
const router = Router()

router.get('/', index)
router.get('/create', create)

export default router
