import { Request, Response } from 'express'
import { Types } from 'mongoose'
import User from '@/models/User'

export async function createThemeInUser(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const { theme } = req.body
    if (!theme) {
      throw 'Required'
    }
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    if (!userFound.type) {
      throw 'Not compatible'
    }
    await User.findByIdAndUpdate(userId, {
      email: userFound.email,
      password: userFound.password,
      accountType: userFound.accountType,
      type: userFound.type,
      themes: userFound.themes
        ? [...userFound.themes, { id: new Types.ObjectId(), theme }]
        : [{ id: new Types.ObjectId(), theme }]
    })
    res.status(201).send({
      success: true,
      status: 201,
      message: 'Theme created'
    })
  } catch (error) {
    if (error === 'Required') {
      res.status(422).send({
        success: false,
        status: 422,
        message: 'All fields are required'
      })
    } else if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User not found'
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

export async function removeThemeInUser(req: Request, res: Response) {
  try {
    const { userId, id } = req.params
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    const themeIndex = userFound.themes?.findIndex((theme) => theme.id.toString() === id)
    if (themeIndex === undefined || themeIndex === -1) {
      throw 'Not found'
    }
    userFound.themes?.splice(themeIndex, 1)
    await userFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Theme removed'
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User or theme not found'
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
