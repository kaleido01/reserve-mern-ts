import { NextApiResponse, NextApiRequest } from 'next'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'
import jwt from 'jsonwebtoken'
import { JwtObject } from './account'
import mongoose from 'mongoose'
connectDb()

const { ObjectId } = mongoose.Types

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
const handleDeleteRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject
    const { productId } = req.query
    console.log(productId)
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true },
    ).populate({
      path: 'products.product',
      model: 'Product',
    })

    console.log(cart.products)

    res.status(200).json(cart.products)
  } catch (error) {
    res.status(403).send('Please login again')
    console.log(error)
  }
}

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productId, quantity } = req.body
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject
    const cart = await Cart.findOne({ user: userId })
    const productExists = cart.products.some((doc: any) => ObjectId(productId).equals(doc.product))

    if (productExists) {
      await Cart.findOneAndUpdate(
        {
          _id: cart._id,
          'products.product': productId,
        },
        { $inc: { 'products.$.quantity': quantity } },
      )
    } else {
      const newProduct = {
        quantity,
        product: productId,
      }
      console.log({ newProduct })
      await Cart.findOneAndUpdate(
        {
          _id: cart._id,
        },
        {
          $addToSet: { products: newProduct },
        },
      )
    }
    res.status(200).json('Cart updated')
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
    case 'PUT':
      await handlePutRequest(req, res)
      break
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}
