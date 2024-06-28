import { Request, Response } from 'express'
import Patient from '@/models/Patient'
import User from '@/models/User'

export async function findPatientsByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const patientsFound = await Patient.find({ userId })
    if (patientsFound.length <= 0) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: patientsFound
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'Patients not found'
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

export async function findPatientById(req: Request, res: Response) {
  try {
    const { userId, id } = req.params
    const userFound = await User.findById(userId)
    if (!userFound) {
      throw 'Not found'
    }
    if (userFound.accountType === 'teacher') {
      throw 'Not compatible'
    }
    const patientFound = await Patient.findById(id)
    if (!patientFound) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      data: patientFound
    })
  } catch (error) {
    if (error === 'Not found') {
      res.status(404).send({
        success: false,
        status: 404,
        message: 'User or patient not found'
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

export async function createPatient(req: Request, res: Response) {
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
    if (userFound.accountType === 'teacher') {
      throw 'Not compatible'
    }
    const newPatient = new Patient({
      userId: userFound._id,
      name,
      age,
      paymentType,
      value,
      themes: userFound.themes ? userFound.themes.map((theme) => ({ ...theme, done: false })) : []
    })
    await newPatient.save()
    res.status(201).send({
      success: true,
      status: 201,
      message: 'Patient created'
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

export async function editPatient(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { name, age, paymentType, value } = req.body
    if (!name && !age && !paymentType && !value) {
      throw 'Required'
    }
    if (paymentType && paymentType !== 'monthly' && paymentType !== 'session') {
      throw 'Poorly formatted'
    }
    const patientFound = await Patient.findById(id)
    if (!patientFound) {
      throw 'Not found'
    }
    await Patient.findByIdAndUpdate(id, {
      name: name ?? patientFound.name,
      age: age ?? patientFound.age,
      paymentType: paymentType ?? patientFound.paymentType,
      value: value ?? patientFound.value
    })
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Patient updated'
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

export async function removePatient(req: Request, res: Response) {
  try {
    const { id } = req.params
    const patientFound = await Patient.findByIdAndDelete(id)
    if (!patientFound) {
      throw 'Not found'
    }
    res.status(200).send({
      success: true,
      status: 200,
      message: 'Patient removed'
    })
  } catch (error) {
    if (error === 'Not found') {
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
