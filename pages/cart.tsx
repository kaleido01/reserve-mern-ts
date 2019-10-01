import React from 'react'
import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import baseUrl from '../utils/baseUrl'
import axios, { AxiosRequestConfig } from 'axios'
import { parseCookies } from 'nookies'
import { Product } from '../models/Cart'
import { PageProps } from './_app'
import { ObjectId } from 'mongodb'
import cookie from 'js-cookie'
import { Token } from 'react-stripe-checkout'

interface Props extends PageProps {
  products: Product[]
}
const Cart = ({ products, user }: Props) => {
  const [cartProducts, setCartProducts] = React.useState(products)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleRemoveFromCart = async (productId: ObjectId) => {
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token')
    console.log(productId)
    const payload = {
      params: { productId },
      headers: { authorization: token },
    }
    const response = await axios.delete<Product[]>(url, payload)
    console.log(response)
    setCartProducts(response.data)
  }
  const handleCheckout = async (paymentData: Token) => {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/checkout`
      const token = cookie.get('token')
      const payload = { paymentData }
      const headers = { headers: { authorization: token } }
      await axios.post(url, payload, headers)
      setSuccess(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Segment loading={loading}>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
        success={success}
      />
      <CartSummary products={cartProducts} handleCheckout={handleCheckout} success={success} />
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
