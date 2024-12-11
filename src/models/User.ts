import { ObjectId, Schema, model } from 'mongoose'

interface UserProps {
  name: string
  email: string
  password: string
  subject?: string
  contents?: {
    id: ObjectId
    content: string
  }[]
}

const contentSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
  },
  { _id: false }
)

const schema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  subject: { type: String },
  contents: { type: [contentSchema], default: undefined }
})

const User = model<UserProps>('users', schema)
export default User
