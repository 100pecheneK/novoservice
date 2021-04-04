import {
  authUser,
  createUser,
  deleteUser,
  deleteUserToken,
  deleteUserTokens,
  getUser,
  saveUserToken,
  userCheckToken,
} from '@services/userService'
import config from 'config'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import auth from 'middleware/auth'

const router = Router()

function parseReq(req: any) {
  //@ts-ignore
  const userId: string = req.userId
  //@ts-ignore
  const token: string = req.token
  return { userId, token }
}

router.post('/register', auth, async (req, res) => {
  try {
    const { userId, token } = parseReq(req)
    await userCheckToken(userId, token)
    await createUser(req.body)
    return res.json({ message: 'Пользоваель создан' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await authUser(req.body)
    const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), {
      expiresIn: '1Y',
    })
    await saveUserToken(user._id, token)
    return res.json({ token })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const { userId, token } = parseReq(req)
    const user = await getUser(userId, token)
    return res.json(user)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/user', auth, async (req, res) => {
  try {
    const { userId, token } = parseReq(req)
    if (req.body._id === userId)
      return res.status(500).json({ message: 'Нельзя удалять себя' })
    await deleteUser(req.body._id, token)
    return res.json({ message: 'Пользователь удален' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/logout', auth, async (req, res) => {
  try {
    const { userId, token } = parseReq(req)
    await deleteUserToken(userId, token)
    return res.json({ message: 'Успешный выход' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.delete('/logoutall', auth, async (req, res) => {
  try {
    const { userId, token } = parseReq(req)
    await deleteUserTokens(userId, token)
    return res.json({ message: 'Успешный выход со всех устройств' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

export default router
