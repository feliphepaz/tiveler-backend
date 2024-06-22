import { ObjectId, Schema, model } from 'mongoose'

interface UserProps {
  email: string
  password: string
  accountType: 'teacher' | 'psychologist'
  subject?: string
  type?: string
  contents?: {
    id: ObjectId
    content: string
  }[]
  themes?: {
    id: ObjectId
    theme: string
  }[]
}

const contentSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
  },
  { _id: false }
)

const themeSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    theme: { type: String, required: true }
  },
  { _id: false }
)

const schema = new Schema<UserProps>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  subject: { type: String },
  type: { type: String },
  contents: { type: [contentSchema], default: undefined },
  themes: { type: [themeSchema], default: undefined }
})

const User = model<UserProps>('users', schema)
export default User
