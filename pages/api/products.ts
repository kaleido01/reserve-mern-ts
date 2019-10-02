import { NextApiResponse, NextApiRequest } from 'next'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, size } = req.query
  const pageNum = Number(page)
  const sizeNum = Number(size)

  const totalDocs = await Product.countDocuments()
  const totalPages = Math.ceil(totalDocs / sizeNum) // !切り上げ

  let products = []
  if (pageNum === 1) {
    products = await Product.find().limit(sizeNum)
  } else {
    products = await Product.find()
      .skip(pageNum * (sizeNum - 1))
      .limit(sizeNum)
  }
  res.status(200).json({ products, totalPages })
}
