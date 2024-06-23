import { Request, Response } from 'express'
import Student from '@/models/Student'
import User from '@/models/User'

export async function findStudentsByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const studentsFound = await Student.find({ userId })
    if (studentsFound.length <= 0) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: studentsFound
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Students not found'
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

export async function findStudentById(req: Request, res: Response) {
  try {
    const { userId, id } = req.params
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    if (userFound.accountType === 'psychologist') {
      throw 'Not compatible'
    }
    const studentFound = await Student.findById(id)
    if (!studentFound) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: studentFound
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User or student not found'
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

export async function createStudent(req: Request, res: Response) {
  try {
    const { userId, name, age, paymentType, value } = req.body
    if (!userId || !name || !age || !paymentType || !value) {
      throw 'Required'
    }
    if (paymentType !== 'monthly' && paymentType !== 'session') {
      throw 'Poorly formatted'
    }
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    if (userFound.accountType === 'psychologist') {
      throw 'Not compatible'
    }
    const newStudent = new Student({
      userId: userFound._id,
      name,
      age,
      paymentType,
      value
    })
    await newStudent.save()
    res.status(201).send({
      success: true,
      status: 201,
      message: 'Student created'
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

export async function editStudent(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { name, age, paymentType, value } = req.body
    if (!name && !age && !paymentType && !value) {
      throw 'Required'
    }
    if (paymentType && paymentType !== 'monthly' && paymentType !== 'session') {
      throw 'Poorly formatted'
    }
    const studentFound = await Student.findById(id)
    if (!studentFound) {
      throw 'Not found'
    }
    await Student.findByIdAndUpdate(id, {
      name: name ?? studentFound.name,
      age: age ?? studentFound.age,
      paymentType: paymentType ?? studentFound.paymentType,
      value: value ?? studentFound.value
    })
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Student updated'
    })
  } catch (error) {
    if (error === 'Required') {
      res.status(422).send({
        success: false,
        status: 422,
        message: 'At least one field is required'
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

export async function removeStudent(req: Request, res: Response) {
  try {
    const { id } = req.params
    const studentFound = await Student.findByIdAndDelete(id)
    if (!studentFound) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Student removed'
    })
  } catch (error) {
    if (error === 'Not found') {
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
