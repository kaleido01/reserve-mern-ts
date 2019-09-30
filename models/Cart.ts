import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { UserType } from './User'
import { ProductType } from './Product'

export interface Product {
  quantity: number
  product: ProductType
}

export interface CartType extends mongoose.Document {
  user: UserType
  products: Product[]
}
const ProductShema = new mongoose.Schema<CartType>({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: ObjectId,
        ref: 'Product',
      },
    },
  ],
})

export default (mongoose.models.Cart as mongoose.Model<CartType, {}>) ||
  mongoose.model<CartType>('Cart', ProductShema)
