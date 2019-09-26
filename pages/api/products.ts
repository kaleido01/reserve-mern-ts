import { NextApiResponse, NextApiRequest } from 'next'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await Product.find()
  res.status(200).json(products)
}
