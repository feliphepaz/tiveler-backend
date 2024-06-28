import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Patient from '@/models/Patient'

export async function findSessionById(req: Request, res: Response) {
  try {
    const { patientId, id } = req.params
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const session = patientFound.sessions.find((session) => session.id.toString() === id)
    if (!session) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: session
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Patient or session not found'
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

export async function createSessionInPatient(req: Request, res: Response) {
  try {
    const { patientId } = req.params
    const { date } = req.body
    if (!date) {
      throw 'Required'
    }
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const newSession = {
      id: new Types.ObjectId(),
      date,
      done: false
    }
    await Patient.findByIdAndUpdate(patientId, {
      userId: patientFound.userId,
      name: patientFound.name,
      age: patientFound.age,
      paymentType: patientFound.paymentType,
      value: patientFound.value,
      themes: patientFound.themes,
      sessions: patientFound.sessions ? [...patientFound.sessions, newSession] : [newSession]
    })
    res.status(201).send({
      success: true,
      status: 201,
      message: 'Session created'
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
        message: 'Patient not found'
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

export async function editSessionInPatient(req: Request, res: Response) {
  try {
    const { patientId, id } = req.params
    const { date, performance, sessionCharacteristics, report, done } = req.body
    if (
      !date &&
      !performance &&
      !sessionCharacteristics &&
      !report &&
      (done === undefined || done === null)
    ) {
      throw 'Required'
    }
    if (
      (done && typeof done !== 'boolean') ||
      (performance && performance !== 'good' && performance !== 'bad')
    ) {
      throw 'Poorly formatted'
    }
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const sessionIndex = patientFound.sessions.findIndex((session) => session.id.toString() === id)
    if (sessionIndex === undefined || sessionIndex === -1) {
      throw 'Not found'
    }
    const sessionFound = patientFound.sessions[sessionIndex]
    sessionFound.date = date ?? sessionFound.date
    sessionFound.performance = performance ?? sessionFound.performance
    sessionFound.sessionCharacteristics =
      sessionCharacteristics ?? sessionFound.sessionCharacteristics
    sessionFound.report = report ?? sessionFound.report
    sessionFound.done = done ?? sessionFound.done
    await patientFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Session updated'
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
        message: 'Patient or session not found'
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

export async function removeSessionInPatient(req: Request, res: Response) {
  try {
    const { patientId, id } = req.params
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const sessionIndex = patientFound.sessions.findIndex((session) => session.id.toString() === id)
    if (sessionIndex === undefined || sessionIndex === -1) {
      throw 'Not found'
    }
    patientFound.sessions.splice(sessionIndex, 1)
    await patientFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Session removed'
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Patient or session not found'
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
