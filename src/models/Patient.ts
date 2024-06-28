import { ObjectId, Schema, model } from 'mongoose'

interface PatientProps {
  userId: ObjectId
  name: string
  age: number
  paymentType: 'monthly' | 'session'
  value: number
  themes: {
    id: ObjectId
    theme: string
    done: boolean
  }[]
  sessions: {
    id: ObjectId
    date: Date
    performance?: 'good' | 'bad'
    sessionCharacteristics?: string[]
    report?: string
    done: boolean
  }[]
}

const themeSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    theme: { type: String, required: true },
    done: { type: Boolean, required: true }
  },
  { _id: false }
)

const sessionSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    performance: { type: String },
    sessionCharacteristics: { type: [String], default: undefined },
    report: { type: String },
    done: { type: Boolean, required: true }
  },
  { _id: false }
)

const schema = new Schema<PatientProps>({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  paymentType: { type: String, required: true },
  value: { type: Number, required: true },
  themes: { type: [themeSchema], default: undefined },
  sessions: { type: [sessionSchema], default: undefined }
})

const Patient = model<PatientProps>('patients', schema)
export default Patient
