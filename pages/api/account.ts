import { NextApiResponse, NextApiRequest } from 'next'
import connectDb from '../../utils/connectDb'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
connectDb()

export interface JwtObject {
  userId: string
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
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
