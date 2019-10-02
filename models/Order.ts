import mongoose from 'mongoose'
import { UserType } from './User'
import { ProductType } from './Product'

export interface Product {
  quantity: number
  product: ProductType
}

export interface OrderType extends mongoose.Document {
  user: UserType
  products: Product[]
  total: number
  email: string
  createdAt: Date
}
const OrderSchema = new mongoose.Schema<OrderType>(
  {
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
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default (mongoose.models.Order as mongoose.Model<OrderType, {}>) ||
  mongoose.model<OrderType>('Order', OrderSchema)
