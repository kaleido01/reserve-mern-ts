import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import Order from '../../models/Order'
import { JwtObject } from './account'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject
    const orders = await Order.find({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    })
    res.status(200).json({ orders })
  } catch (error) {
    console.log(error)
    res.status(403).send('Please login again')
  }
}
