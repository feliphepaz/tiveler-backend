import { Request, Response } from 'express'
import User from '@/models/User'

export function index(req: Request, res: Response) {
  try {
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Tardis back-end running'
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      status: 400,
      message: 'Error in request'
    })
  }
}

export async function create(req: Request, res: Response) {
  try {
    const user = new User({
      username: 'Feliphe Paz',
      password: 'teste1'
    })
    await user.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'User created'
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      status: 400,
      message: 'Error in request'
    })
  }
}
