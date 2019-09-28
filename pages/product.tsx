import React from 'react'
import axios from 'axios'
import { ProductType } from '../models/Product'
import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributest'
import baseUrl from '../utils/baseUrl'

type Props = {
  product: ProductType
}

const Product = (props: Props) => {
  const { product } = props
  return (
    <>
      <ProductSummary product={product} />
      <ProductAttributes product={product} />
    </>
  )
}

Product.getInitialProps = async ({ query }) => {
  const { _id } = query
  const url = `${baseUrl}/api/product`
  const payload = { params: { _id } }
  const response = await axios.get(url, payload)
  return { product: response.data }
}

export default Product
