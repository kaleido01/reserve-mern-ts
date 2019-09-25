import products from '../../static/products.json'
import { NextApiResponse, NextApiRequest } from 'next'

import connectDb from '../../utils/connectDb'

connectDb()

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(products)
}
