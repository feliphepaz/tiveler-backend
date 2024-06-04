import { Request, Response } from 'express'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

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

export async function create(req: Request, res: Response) {
  try {
    const { email, password, accountType } = req.body
    if (!email || !password || !accountType) {
      throw 401
    } else {
      const userFound = await User.findOne({ email })
      if (userFound) {
        throw 409
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = new User({
          email,
          password: hash,
          accountType
        })
        await user.save()
        res.status(200).send({
          success: true,
          status: 200,
          message: 'User created'
        })
      }
    }
  } catch (error) {
    if (error === 401) {
      res.status(401).send({
        success: false,
        status: 401,
        message: 'All fields are required'
      })
    } else if (error === 409) {
      res.status(409).send({
        success: false,
        status: 409,
        message: 'User already exists'
      })
    } else {
      res.status(400).send({
        success: false,
        status: 400,
        message: 'Error in request'
      })
    }
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      throw 401
    } else {
      await User.findByIdAndDelete(id)
      res.status(200).send({
        success: true,
        status: 200,
        message: 'User deleted'
      })
    }
  } catch (error) {
    if (error === 401) {
      res.status(401).send({
        success: false,
        status: 401,
        message: 'All fields are required'
      })
    } else {
      res.status(400).send({
        success: false,
        status: 400,
        message: 'Error in request'
      })
    }
  }
}
