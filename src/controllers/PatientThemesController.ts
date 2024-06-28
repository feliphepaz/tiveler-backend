import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Patient from '@/models/Patient'

export async function createThemeInPatient(req: Request, res: Response) {
  try {
    const { patientId } = req.params
    const { theme } = req.body
    if (!theme) {
      throw 'Required'
    }
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const newTheme = { id: new Types.ObjectId(), theme, done: false }
    await Patient.findByIdAndUpdate(patientId, {
      userId: patientFound.userId,
      name: patientFound.name,
      age: patientFound.age,
      paymentType: patientFound.paymentType,
      value: patientFound.value,
      themes: patientFound.themes ? [...patientFound.themes, newTheme] : [newTheme]
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

export async function handleThemeInPatient(req: Request, res: Response) {
  try {
    const { patientId, id } = req.params
    const { done } = req.body
    if (done === undefined || done === null) {
      throw 'Required'
    }
    if (typeof done !== 'boolean') {
      throw 'Poorly formatted'
    }
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const themeIndex = patientFound.themes.findIndex((theme) => theme.id.toString() === id)
    if (themeIndex === undefined || themeIndex === -1) {
      throw 'Not found'
    }
    const themeFound = patientFound.themes[themeIndex]
    if (done) {
      themeFound.done = true
    } else {
      themeFound.done = false
    }
    await patientFound.save()
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Theme changed'
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
        message: 'Patient or theme not found'
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

export async function removeThemeInPatient(req: Request, res: Response) {
  try {
    const { patientId, id } = req.params
    const patientFound = await Patient.findById(patientId)
    if (!patientFound) {
      throw 'Not found'
    }
    const themeIndex = patientFound.themes.findIndex((theme) => theme.id.toString() === id)
    if (themeIndex === undefined || themeIndex === -1) {
      throw 'Not found'
    }
    patientFound.themes.splice(themeIndex, 1)
    await patientFound.save()
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
        message: 'Patient or theme not found'
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
