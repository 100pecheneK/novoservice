import express from 'express'
import cors from 'cors'
import routes from './routes'
import connectDB from '@utils/db'
import auth from 'middleware/auth'
// Create Server
const app = express()

// Connect to DataBase
connectDB()
// Init Middleware
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
// app.use('/uploads', express.static('uploads'))
app.use('/api/settings', auth, routes.settings)
app.use('/api/timetable', auth, routes.timetable)
app.use('/api/shop', auth, routes.shop)
app.use('/api/link', auth, routes.link)
app.use('/api/auth', routes.auth)

// Define Errors catchers
app.use(function (req, res) {
  res.status(404).send('Sorry cant find that!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
)
