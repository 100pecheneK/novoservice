import mongoose, { Schema, Document } from 'mongoose'

export interface ITimetable {
  _shopName: string
  timetable: {
    day: string
    from: { h: number; m: number }
    to: { h: number; m: number }
  }[]
}

type ITimetableModelType = ITimetable & Document

const TimetableSchema = new Schema({
  _shopName: { type: String, unique: true },
  timetable: [
    {
      day: String,
      from: { h: Number, m: Number },
      to: { h: Number, m: Number },
    },
  ],
})

export default mongoose.model<ITimetableModelType>('timetable', TimetableSchema)
