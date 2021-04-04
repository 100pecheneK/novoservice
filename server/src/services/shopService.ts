import Shop, { IShop } from '@models/Shop'

export const createShop = async (shopProps: IShop) => {
  const shop = await Shop.countDocuments({
    _shopName: shopProps._shopName,
  })
  if (shop) throw new Error('Магазин уже создан')

  return await Shop.create(shopProps)
}

export const getAllShops = async () => await Shop.find().sort('_sort')

export const getShopByDocumentName = async (_shopName: IShop['_shopName']) => {
  const shop = await Shop.findOne({ _shopName })
  if (!shop) throw new Error('Магазин не найден')
  return shop
}

export const deleteShopByDocumentName = async (_shopName: IShop['_shopName']) =>
  await Shop.deleteOne({ _shopName })

export const updateShop = async (shopProps: IShop) => {
  const shop = await Shop.countDocuments({
    _shopName: shopProps._shopName,
  })
  if (!shop) throw new Error('Магазин не найден')
  await Shop.findOneAndUpdate({ _shopName: shopProps._shopName }, shopProps)
  return await getShopByDocumentName(shopProps._shopName)
}
