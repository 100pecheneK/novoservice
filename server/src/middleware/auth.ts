import { getUser, userCheckIfExists } from '@services/userService'
import config from 'config'
import express, { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function auth(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  // Get token from header
  const token = req.header('Authorization')

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    // @ts-ignore
    await userCheckIfExists(decoded.userId)
    // @ts-ignore
    req.userId = decoded.userId
    // @ts-ignore
    req.token = token
    next()
  } catch (e) {
    res.status(401).json({ msg: 'Токен неверный' })
  }
}
