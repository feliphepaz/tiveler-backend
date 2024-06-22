import { Request, Response } from 'express'

export function index(req: Request, res: Response) {
  try {
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Tardis backend running'
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      status: 400,
      message: 'Error in request'
    })
  }
}
