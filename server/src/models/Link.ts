import mongoose, { Schema, Document } from 'mongoose'

export interface ILink {
  _shopName: string
  type: string
  text: string
  href: string
  icon: string
}

type LinkModelType = ILink & Document

const SettingsSchema = new Schema({
  _shopName: String,
  type: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})

export default mongoose.model<LinkModelType>('link', SettingsSchema)
