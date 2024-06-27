import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Student from '@/models/Student'

export async function createContentInStudent(req: Request, res: Response) {
  try {
    const { studentId } = req.params
    const { content } = req.body
    if (!content) {
      throw 'Required'
    }
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    await Student.findByIdAndUpdate(studentId, {
      userId: studentFound.userId,
      name: studentFound.name,
      age: studentFound.age,
      paymentType: studentFound.paymentType,
      value: studentFound.value,
      contents: studentFound.contents
        ? [...studentFound.contents, { id: new Types.ObjectId(), content, done: false }]
        : [{ id: new Types.ObjectId(), content, done: false }]
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
        message: 'Student not found'
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

export async function handleContentInStudent(req: Request, res: Response) {
  try {
    const { studentId, id } = req.params
    const { done } = req.body
    if (done === undefined || done === null) {
      throw 'Required'
    }
    if (typeof done !== 'boolean') {
      throw 'Poorly formatted'
    }
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    const contentIndex = studentFound.contents?.findIndex((content) => content.id.toString() === id)
    if (contentIndex === undefined || contentIndex === -1) {
      throw 'Not found'
    }
    if (done) {
      studentFound.contents[contentIndex].done = true
    } else {
      studentFound.contents[contentIndex].done = false
    }
    await studentFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Content changed'
    })
  } catch (error) {
    if (error === 'Required') {
      res.status(422).send({
        success: false,
        status: 422,
        message: 'All fields are required'
      })
    } else if (error === 'Poorly formatted') {
      res.status(400).send({
        success: false,
        status: 400,
        message: 'Fields are poorly formatted'
      })
    } else if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Student or content not found'
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

export async function removeContentInStudent(req: Request, res: Response) {
  try {
    const { studentId, id } = req.params
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    const contentIndex = studentFound.contents?.findIndex((content) => content.id.toString() === id)
    if (contentIndex === undefined || contentIndex === -1) {
      throw 'Not found'
    }
    studentFound.contents?.splice(contentIndex, 1)
    await studentFound.save()
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
        message: 'Student or content not found'
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
