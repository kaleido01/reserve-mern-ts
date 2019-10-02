import { NextApiResponse, NextApiRequest } from 'next'
import connectDb from '../../utils/connectDb'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
connectDb()

export interface JwtObject {
  userId: string
}
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorication token')
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject

    const user = await User.findOne({ _id: userId })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json('User not found')
    }
  } catch (error) {
    res.status(403).send('Invalid token')
  }
}
const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, role } = req.body
  await User.findByIdAndUpdate({ _id }, { role })
  res.status(200).send('User Updated')
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'PUT':
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }
}
