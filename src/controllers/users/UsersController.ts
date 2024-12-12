import { Request, Response } from 'express'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function findUserById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userFound = await User.findById(id)
    if (!userFound) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: userFound
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User not found'
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

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, subject } = req.body
    if (!name || !email || !password || !subject) {
      throw 'Required'
    }
    const userFound = await User.findOne({ email })
    if (userFound) {
      throw 'Already exists'
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({
      name,
      email,
      password: hash,
      subject
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      status: 201,
      message: 'User created'
    })
  } catch (error) {
    if (error === 'Required') {
      res.status(422).send({
        success: false,
        status: 422,
        message: 'All fields are required'
      })
    } else if (error === 'Already exists') {
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

export async function editUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { name, email, password, subject } = req.body
    if (!name && !email && !password && !subject) {
      throw 'Required'
    }
    const userFound = await User.findById(id)
    if (!userFound) {
      throw 'Not found'
    }
    const salt = bcrypt.genSaltSync(10)
    await User.findByIdAndUpdate(id, {
      name: name ?? userFound?.name,
      email: email ?? userFound?.email,
      password: password ? bcrypt.hashSync(password, salt) : userFound?.password,
      subject: subject ?? userFound?.subject
    })
    res.status(200).send({
      success: true,
      status: 200,
      message: 'User updated'
    })
  } catch (error) {
    if (error === 'Required') {
      res.status(422).send({
        success: false,
        status: 422,
        message: 'At least one field is required'
      })
    } else if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User not found'
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

export async function removeUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userFound = await User.findByIdAndDelete(id)
    if (!userFound) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      message: 'User removed'
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User not found'
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
