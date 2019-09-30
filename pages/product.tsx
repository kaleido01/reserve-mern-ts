import React from 'react'
import axios from 'axios'
import { ProductType } from '../models/Product'
import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributest'
import baseUrl from '../utils/baseUrl'
import { PageProps } from './_app'

interface Props extends PageProps {
  product: ProductType
}

const Product = (props: Props) => {
  const { product, isRootOrAdmin } = props
  return (
    <>
      <ProductSummary product={product} />
      <ProductAttributes product={product} isRootOrAdmin={isRootOrAdmin} />
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
