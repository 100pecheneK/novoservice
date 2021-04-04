import {
  createLink,
  deleteLinkById,
  getAllLinksByShopName,
  getLinkById,
  updateLinkById,
} from '@services/linkServise'
import { Router } from 'express'

const router = Router()

router.get('/all', async (req, res) => {
  try {
    const _shopName = req.body._shopName
    const links = await getAllLinksByShopName(_shopName)
    return res.json(links)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Ссылка не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const linkId = req.body.id
    const link = await getLinkById(linkId)
    return res.json(link)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Ссылка не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const createdLink = await createLink(req.body)

    return res.json(createdLink)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Ссылка не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.patch('/', async (req, res) => {
  try {
    const updatedLink = await updateLinkById(req.body)
    return res.json(updatedLink)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Ссылка не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/', async (req, res) => {
  try {
    const linkId = req.body.id
    await deleteLinkById(linkId)
    return res.json({ message: 'Ссылка удалена' })
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Ссылка не найдена' })
    }
    return res.status(500).json({ message: e.message })
  }
})
export default router
