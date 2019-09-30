import { NextApiResponse, NextApiRequest } from 'next'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isEmail, isLength } from 'validator'
connectDb()

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query
  const product = await Product.findOne({ _id })
  res.status(200).json(product)
}
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, email } = req.body
  if (!password || !email) {
    return res.status(422).send('User missing one or more fields')
  }

  try {
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6')
    } else if (!isEmail(email)) {
      return res.status(422).send('Email is invalid')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      res.status(404).send('no user exists with that email')
    }
    const isCollectPassword = await bcrypt.compare(password, user.password)
    if (isCollectPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
      console.log(token)
      res.status(200).json(token)
    } else {
      res.status(401).send('password is invalid')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Failed create user please try again')
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
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
