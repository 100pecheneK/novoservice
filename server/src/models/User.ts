import mongoose, { Schema, Document } from 'mongoose'

export interface IUser {
  username: string
  password: string
  tokens: string[]
}

type IUserModelType = IUser & Document

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: [String],
    default: [],
  },
})

export default mongoose.model<IUserModelType>('user', UserSchema)
