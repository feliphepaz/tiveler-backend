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
    const { email, password, accountType, subject, type } = req.body
    if (!email || !password || !accountType || (!subject && !type)) {
      throw 'Required'
    }
    const userFound = await User.findOne({ email })
    if (userFound) {
      throw 'Already exists'
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    if (accountType !== 'teacher' && accountType !== 'psychologist') {
      throw 'Poorly formatted'
    }
    if (accountType === 'teacher' && !type) {
      const newUser = new User({
        email,
        password: hash,
        accountType,
        subject
      })
      await newUser.save()
      res.status(201).send({
        success: true,
        status: 201,
        message: 'User created'
      })
    } else if (accountType === 'psychologist' && !subject) {
      const newUser = new User({
        email,
        password: hash,
        accountType,
        type
      })
      await newUser.save()
      res.status(201).send({
        success: true,
        status: 201,
        message: 'User created'
      })
    } else {
      throw 'Not compatible'
    }
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
    } else if (error === 'Poorly formatted') {
      res.status(400).send({
        success: false,
        status: 400,
        message: 'Fields are poorly formatted'
      })
    } else if (error === 'Not compatible') {
      res.status(401).send({
        success: false,
        status: 401,
        message: 'User is not compatible'
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
    const { email, password } = req.body
    if (!email && !password) {
      throw 'Required'
    }
    const userFound = await User.findById(id)
    if (!userFound) {
      throw 'Not found'
    }
    const salt = bcrypt.genSaltSync(10)
    await User.findByIdAndUpdate(id, {
      email: email ?? userFound?.email,
      password: password ? bcrypt.hashSync(password, salt) : userFound?.password
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
