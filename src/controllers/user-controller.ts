import { Request, Response } from 'express'

export default class UserController {
  async index(req: Request, res: Response) {
    try {
      res.status(200)
      res.send({
        success: true,
        status: 200,
        message: 'Tardis back-end running'
      })
    } catch (error) {
      res.status(400)
      res.send({
        success: false,
        status: 400,
        message: 'Error in request'
      })
    }
  }
}
