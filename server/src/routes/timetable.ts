import {
  createTimetable,
  deleteTimetableByShopName,
  getTimetableByShopName,
  updateTimetableByShopName,
} from '@services/timetbleService'
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const timetable = await getTimetableByShopName(req.body._shopName)
    return res.json(timetable)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Таблица не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newTimeTable = await createTimetable(req.body)
    return res.json(newTimeTable)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Таблица не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.patch('/', async (req, res) => {
  try {
    const updatedTimetable = await updateTimetableByShopName(req.body)
    return res.json(updatedTimetable)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Таблица не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/', async (req, res) => {
  try {
    await deleteTimetableByShopName(req.body._shopName)
    return res.json({ message: 'Timetable deleted' })
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Таблица не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

export default router
