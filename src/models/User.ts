import { Schema, model } from 'mongoose'

interface UserProps {
  email: string
  password: string
  accountType: 'teacher' | 'psychologist'
}

const schema = new Schema<UserProps>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true }
})

const User = model<UserProps>('users', schema)
export default User
