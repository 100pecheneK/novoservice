import mongoose, { Schema, Document } from 'mongoose'

export interface ISettings {
  _type: string
  welcomeTitle: string
}

type SettingsModelType = ISettings & Document

const SettingsSchema = new Schema({
  _type: {
    type: String,
    default: '',
  },
  welcomeTitle: {
    type: String,
    default: '',
  },
})

export default mongoose.model<SettingsModelType>('settings', SettingsSchema)
