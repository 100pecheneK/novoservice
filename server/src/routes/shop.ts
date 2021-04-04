import { deleteLinksByShopName } from '@services/linkServise'
import {
  createShop,
  deleteShopByDocumentName,
  getAllShops,
  getShopByDocumentName,
  updateShop,
} from '@services/shopService'
import { deleteTimetableByShopName } from '@services/timetbleService'
import { Router } from 'express'

const router = Router()

router.get('/all', async (req, res) => {
  try {
    const shops = await getAllShops()
    return res.json(shops)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const shop = await getShopByDocumentName(req.body._shopName)
    return res.json(shop)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Магазин не найден' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newShop = await createShop(req.body)
    return res.json(newShop)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.patch('/', async (req, res) => {
  try {
    const shopFields = {
      ...req.body,
    }
    const updatedShop = await updateShop(shopFields)
    return res.json(updatedShop)
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Магазин не найден' })
    }
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/', async (req, res) => {
  try {
    const _shopName = req.body._shopName
    await deleteShopByDocumentName(_shopName)
    await deleteTimetableByShopName(_shopName)
    await deleteLinksByShopName(_shopName)
    return res.json({ message: 'Магазин удален' })
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Магазин не найден' })
    }
    return res.status(500).json({ message: e.message })
  }
})

export default router
