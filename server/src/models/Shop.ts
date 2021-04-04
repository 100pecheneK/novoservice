import mongoose, { Schema, Document } from 'mongoose'

export interface IShop {
  _type: string
  _shopName: string
  _link: string
  _sort: number
  title: string
  subtitle: string
  logo: string
  servicesContacts: ['vk' | 'email' | 'whatsapp']
  logoAlt: string
  mainH1: string
  mainH2: string
  mainShortAddres: string
  map: string
}

type ShopModelType = IShop & Document

const ShopSchema = new Schema({
  _type: {
    type: String,
    default: '',
  },
  _shopName: {
    type: String,
    unique: true,
  },
  _link: {
    type: String,
    default: '',
  },
  _sort: Number,
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  logoAlt: {
    type: String,
    default: '',
  },
  mainH1: {
    type: String,
    default: '',
  },
  mainH2: {
    type: String,
    default: '',
  },
  mainShortAddres: {
    type: String,
    default: '',
  },
  servicesContacts: [String],
  map: {
    type: String,
    default: '',
  },
})

export default mongoose.model<ShopModelType>('shop', ShopSchema)
