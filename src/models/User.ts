import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model('User', userModel)
export default User
