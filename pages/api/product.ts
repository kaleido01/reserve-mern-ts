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
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, price, description, mediaUrl } = req.body
  if (!name || !price || !description || !mediaUrl) {
    return res.status(422).send('Priduct missing one or more fields')
  }
  const newProduct = new Product({
    name,
    price,
    description,
    mediaUrl,
  })
  try {
    await newProduct.save()
  } catch (error) {
    res.status(500).send('server error occured')
  }

  res.status(201).json(newProduct)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break
    case 'POST':
      await handlePostRequest(req, res)
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
