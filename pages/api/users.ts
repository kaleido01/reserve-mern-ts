import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JwtObject } from './account'
import User from '../../models/User'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject
    const users = await User.find({ _id: { $ne: userId } })

    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(403).send('Please login again')
  }
}
