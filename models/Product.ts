import mongoose from 'mongoose'
import shortid from 'shortid'

export interface ProductType extends mongoose.Document {
  name: string
  price: number
  sku: string
  description: string
  mediaUrl: string
}
const ProductShema = new mongoose.Schema<ProductType>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate(),
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
})

export default (mongoose.models.Product as mongoose.Model<ProductType, {}>) ||
  mongoose.model<ProductType>('Product', ProductShema)
