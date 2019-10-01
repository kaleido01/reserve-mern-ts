import uuidv4 from 'uuid/v4'
import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JwtObject } from './account'
import Cart from '../../models/Cart'
import calculateCartTotal from '../../utils/calculateCartTotal'
import { Token } from 'react-stripe-checkout'
import Order from '../../models/Order'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { paymentData }: { paymentData: Token } = req.body
  console.log('productId')

  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as JwtObject
    console.log('productId')
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    })
    const { stripeTotal, cartTotal } = calculateCartTotal(cart.products)
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    })

    const isExistingCustomer = prevCustomer.data.length > 0
    let newCustomer
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      })
    }
    const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer
    await stripe.charges.create(
      {
        currency: 'USD',
        amount: stripeTotal,
        // eslint-disable-next-line @typescript-eslint/camelcase
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        idempotency_key: uuidv4(),
      },
    )
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    }).save()
    console.log('order')
    await Cart.findByIdAndUpdate({ _id: cart._id }, { $set: { products: [] } })
    res.status(200).send('check out success')
  } catch (error) {
    console.log(error)
  }
}
