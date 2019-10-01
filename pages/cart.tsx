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

interface Props extends PageProps {
  products: Product[]
}
const Cart = ({ products, user }: Props) => {
  const [cartProducts, setCartProducts] = React.useState(products)

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
  return (
    <Segment>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <CartSummary products={cartProducts} />
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
