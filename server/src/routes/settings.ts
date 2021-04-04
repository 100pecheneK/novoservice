import { ISettings } from '@models/Settings'
import {
  createSettings,
  deleteSettings,
  getSettings,
  updateSettings,
} from '@services/settingsService'
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const settings = await getSettings()
    return res.json(settings)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const settingsFields = <ISettings>req.body

    const newSettings = await createSettings(settingsFields)
    return res.json(newSettings)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.patch('/', async (req, res) => {
  try {
    const settingsFields = <ISettings>req.body
    const updatedSettings = await updateSettings(settingsFields)
    return res.json(updatedSettings)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/', async (req, res) => {
  try {
    await deleteSettings()
    return res.json({ message: 'Settings deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

export default router
