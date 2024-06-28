import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Student from '@/models/Student'

export async function findLessonById(req: Request, res: Response) {
  try {
    const { studentId, id } = req.params
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    const lesson = studentFound.lessons.find((lesson) => lesson.id.toString() === id)
    if (!lesson) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: lesson
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Student or lesson not found'
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

export async function createLessonInStudent(req: Request, res: Response) {
  try {
    const { studentId } = req.params
    const { date } = req.body
    if (!date) {
      throw 'Required'
    }
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    const newLesson = {
      id: new Types.ObjectId(),
      date,
      done: false
    }
    await Student.findByIdAndUpdate(studentId, {
      userId: studentFound.userId,
      name: studentFound.name,
      age: studentFound.age,
      paymentType: studentFound.paymentType,
      value: studentFound.value,
      contents: studentFound.contents,
      lessons: studentFound.lessons ? [...studentFound.lessons, newLesson] : [newLesson]
    })
    res.status(201).send({
      success: true,
      status: 201,
      message: 'Lesson created'
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

export async function editLessonInStudent(req: Request, res: Response) {
  try {
    const { studentId, id } = req.params
    const { date, performance, lessonCharacteristics, report, done } = req.body
    if (
      !date &&
      !performance &&
      !lessonCharacteristics &&
      !report &&
      (done === undefined || done === null)
    ) {
      throw 'Required'
    }
    if ((performance !== 'good' && performance !== 'bad') || typeof done !== 'boolean') {
      throw 'Poorly formatted'
    }
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    const lessonIndex = studentFound.lessons.findIndex((lesson) => lesson.id.toString() === id)
    if (lessonIndex === undefined || lessonIndex === -1) {
      throw 'Not found'
    }
    const lessonFound = studentFound.lessons[lessonIndex]
    lessonFound.date = date ?? lessonFound.date
    lessonFound.performance = performance ?? lessonFound.performance
    lessonFound.lessonCharacteristics = lessonCharacteristics ?? lessonFound.lessonCharacteristics
    lessonFound.report = report ?? lessonFound.report
    lessonFound.done = done ?? lessonFound.done
    await studentFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Lesson updated'
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
        message: 'Student or lesson not found'
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

export async function removeLessonInStudent(req: Request, res: Response) {
  try {
    const { studentId, id } = req.params
    const studentFound = await Student.findById(studentId)
    if (!studentFound) {
      throw 'Not found'
    }
    const lessonIndex = studentFound.lessons.findIndex((lesson) => lesson.id.toString() === id)
    if (lessonIndex === undefined || lessonIndex === -1) {
      throw 'Not found'
    }
    studentFound.lessons.splice(lessonIndex, 1)
    await studentFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Lesson removed'
    })
  } catch (error) {
    console.log(error)
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Student or lesson not found'
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
