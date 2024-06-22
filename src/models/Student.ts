import { ObjectId, Schema, model } from 'mongoose'

interface StudentProps {
  userId: ObjectId
  name: string
  age: number
  paymentType: 'monthly' | 'session'
  value: number
}

const schema = new Schema<StudentProps>({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  paymentType: { type: String, required: true },
  value: { type: Number, required: true }
})

const Student = model<StudentProps>('students', schema)
export default Student
