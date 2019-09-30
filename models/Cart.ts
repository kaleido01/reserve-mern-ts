import mongoose from 'mongoose'
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
const CartSchema = new mongoose.Schema<CartType>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
})

export default (mongoose.models.Cart as mongoose.Model<CartType, {}>) ||
  mongoose.model<CartType>('Cart', CartSchema)
