import { NextApiResponse, NextApiRequest } from 'next'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'
import jwt from 'jsonwebtoken'
import { JwtObject } from './account'

connectDb()

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject

    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    })
    res.status(200).json(cart.products)
  } catch (error) {
    res.status(403).send('Please login again')
    console.log(error)
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}
