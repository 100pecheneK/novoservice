import User, { IUser } from '@models/User'
import bcrypt from 'bcryptjs'

export const createUser = async (userArgs: IUser) => {
  let user = await User.findOne({ username: userArgs.username })
  if (user) throw new Error('Пользователь уже существует')

  const salt = await bcrypt.genSalt(10)
  userArgs.password = await bcrypt.hash(userArgs.password, salt)

  user = new User(userArgs)

  await user.save()
  return user._id
}

export const deleteUser = async (_id: string, token: string) => {
  await userCheckToken(_id, token)
  const user = await User.findOne({ _id })
  if (!user) throw new Error('Пользователь не найден')
  await user.delete()
}

export const getUser = async (_id: string, token: string) => {
  await userCheckToken(_id, token)
  const user = await User.findOne({ _id }).select('-password -tokens')
  if (!user) throw new Error('Пользователь не найден')
  return user
}
export const authUser = async (userArgs: IUser) => {
  const user = await User.findOne({ username: userArgs.username })
  if (!user) throw new Error('Пользователь не найден')
  const isMatch = await bcrypt.compare(userArgs.password, user.password)
  if (!isMatch) throw new Error('Неверные данные')
  return user
}

export const userCheckIfExists = async (_id: string) => {
  const user = await User.countDocuments({ _id })
  if (!user) throw new Error('Пользователя не существует')
}

export const userCheckToken = async (_id: string, token: string) => {
  const user = await getUserWithTokensOnly(_id)
  if (!user.tokens.includes(token))
    throw new Error('Токен пользователья не найден')
}

export const saveUserToken = async (_id: string, token: string) => {
  const user = await getUserWithTokensOnly(_id)
  if (!user) throw new Error('Пользователь не найден')
  console.log('saveUserToken -> user', user)
  user.tokens = [...user.tokens, token]
  await user.save()
}

export const deleteUserToken = async (_id: string, token: string) => {
  await userCheckToken(_id, token)
  const user = await getUserWithTokensOnly(_id)
  if (!user) throw new Error('Пользователь не найден')
  user.tokens = user.tokens.filter(tk => tk !== token)
  await user.save()
}

export const deleteUserTokens = async (_id: string, token: string) => {
  await userCheckToken(_id, token)
  const user = await getUserWithTokensOnly(_id)
  if (!user) throw new Error('Пользователь не найден')
  user.tokens = []
  await user.save()
}

const getUserWithTokensOnly = async (_id: string) => {
  const user = await User.findById(_id).select('tokens')
  if (!user) throw new Error('Пользователь не найден')
  return user
}
