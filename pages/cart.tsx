import React from 'react'
import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import baseUrl from '../utils/baseUrl'
import axios, { AxiosRequestConfig } from 'axios'
import { parseCookies } from 'nookies'
import { Product } from '../models/Cart'

interface Props {
  products: Product[]
}
const Cart = ({ products }: Props) => {
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  )
}

Cart.getInitialProps = async ctx => {
  const url = `${baseUrl}/api/cart`
  const { token } = parseCookies(ctx)
  if (!token) {
    return { products: [] }
  }
  const payload: AxiosRequestConfig = { headers: { authorization: token } }
  try {
    const response = await axios.get(url, payload)
    return { products: response.data as Product[] }
  } catch (error) {
    console.log(error)
  }
}

export default Cart
