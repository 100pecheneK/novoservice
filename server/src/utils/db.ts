import mongoose from 'mongoose'
import config from 'config'

const db = config.get<string>('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log('Mongo DB Connected...')
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

export default connectDB
