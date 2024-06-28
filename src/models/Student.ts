import { ObjectId, Schema, model } from 'mongoose'

interface StudentProps {
  userId: ObjectId
  name: string
  age: number
  paymentType: 'monthly' | 'lesson'
  value: number
  contents: {
    id: ObjectId
    content: string
    done: boolean
  }[]
  lessons: {
    id: ObjectId
    date: Date
    performance?: 'good' | 'bad'
    lessonCharacteristics?: string[]
    report?: string
    done: boolean
  }[]
}

const contentSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    done: { type: Boolean, required: true }
  },
  { _id: false }
)

const lessonSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    performance: { type: String },
    lessonCharacteristics: { type: [String], default: undefined },
    report: { type: String },
    done: { type: Boolean, required: true }
  },
  { _id: false }
)

const schema = new Schema<StudentProps>({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  paymentType: { type: String, required: true },
  value: { type: Number, required: true },
  contents: { type: [contentSchema], default: undefined },
  lessons: { type: [lessonSchema], default: undefined }
})

const Student = model<StudentProps>('students', schema)
export default Student
