import { NextApiResponse, NextApiRequest } from 'next'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query
  const product = await Product.findOne({ _id })
  res.status(200).json(product)
}
const handleDeleteRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query
  await Product.deleteOne({ _id })
  res.status(204).json({})
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break

    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { _id } = req.query
//   const product = await Product.findOne({ _id })
//   res.status(200).json(product)
// }
