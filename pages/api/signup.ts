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
  const { name, password, email } = req.body
  if (!name || !password || !email) {
    return res.status(422).send('User missing one or more fields')
  }

  try {
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 charactors long')
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6')
    } else if (!isEmail(email)) {
      return res.status(422).send('Email is invalid')
    }
    const user = await User.findOne({ email })
    if (user) return res.status(422).send(`User already exists with email ${email}`)
    const hash = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      password: hash,
      email,
    })
    await newUser.save()
    console.log(newUser)

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    console.log(token)
    res.status(201).json(token)
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
