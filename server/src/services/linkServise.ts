import Link, { ILink } from '@models/Link'
import Shop from '@models/Shop'
import { getShopByDocumentName } from './shopService'

export const getAllLinksByShopName = async (_shopName: ILink['_shopName']) => {
  const links = await Link.find({ _shopName })
  if (!links) {
    return []
  }
  return links
}

export const getLinkById = async (_id: string) => {
  const link = await Link.findById(_id)
  if (!link) throw new Error('Ссылка не найдена')
  return link
}
export const createLink = async (linkArgs: ILink) => {
  const shop = await Shop.countDocuments({ _shopName: linkArgs._shopName })
  if (!shop) throw new Error('Магаин на найден')
  return await Link.create(linkArgs)
}
export const deleteLinkById = async (_id: string) => {
  await Link.deleteOne({ _id })
}
export const updateLinkById = async (linkArgs: ILink & { _id: string }) => {
  const link = await Link.countDocuments({ _id:linkArgs._id })
  if (!link) throw new Error('Ссылка не найдена')
  await Link.findByIdAndUpdate(linkArgs._id, { ...linkArgs })
  return await getLinkById(linkArgs._id)
}
export const deleteLinksByShopName = async (_shopName: ILink['_shopName']) => {
  await Link.deleteMany({ _shopName })
}
