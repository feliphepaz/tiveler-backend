import { Request, Response } from 'express'
import { Types } from 'mongoose'
import User from '@/models/User'

export async function createContentInUser(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const { content } = req.body
    if (!content) {
      throw 'Required'
    }
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    if (!userFound.subject) {
      throw 'Not compatible'
    }
    await User.findByIdAndUpdate(userId, {
      email: userFound.email,
      password: userFound.password,
      accountType: userFound.accountType,
      subject: userFound.subject,
      contents: userFound.contents
        ? [...userFound.contents, { id: new Types.ObjectId(), content }]
        : [{ id: new Types.ObjectId(), content }]
    })
    res.status(201).send({
      success: true,
      status: 201,
      message: 'Content created'
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

export async function removeContentInUser(req: Request, res: Response) {
  try {
    const { userId, id } = req.params
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    const contentIndex = userFound.contents?.findIndex((content) => content.id.toString() === id)
    if (contentIndex === undefined || contentIndex === -1) {
      throw 'Not found'
    }
    userFound.contents?.splice(contentIndex, 1)
    await userFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Content removed'
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User or content not found'
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
