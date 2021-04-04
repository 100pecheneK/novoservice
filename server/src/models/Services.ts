import mongoose, { Schema, Document } from 'mongoose'

export interface IServise {
  shopName: string
  title: string
  subtitle: string
  subservices: string[]
  image: string
  imageAlt: string
  vk: string
}

type ServiceModelType = IServise & Document

const ServiceSchema = new Schema({
  shopName: String,
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  subservices: {
    type: [String],
    default: null,
  },
  image: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  vk: {
    type: String,
    default: null,
  },
})

export default mongoose.model<ServiceModelType>('service', ServiceSchema)
