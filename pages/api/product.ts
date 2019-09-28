import { NextApiResponse, NextApiRequest } from 'next'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query
  const product = await Product.findOne({ _id })
  res.status(200).json(product)
}
