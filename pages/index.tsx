import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import { ProductType } from '../models/Product'
import baseUrl from '../utils/baseUrl'
import { NextPageContext } from 'next'
import ProductPagination from '../components/Index/ProductPagination'

type Product = {
  name: string
  price: number
  description: string
  sku: string
  mediaUrl: string
}
type Props = {
  products: ProductType[]
  totalPages: string
}

function Home(props: Props) {
  const { products, totalPages } = props
  // React.useEffect(() => {
  //   function getProducts() {
  //     const url = 'http://localhost:3000/api/products'
  //     axios.get(url)
  //   }
  //   getProducts()
  // }, [])

  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  const page = ctx.query.page || '1'
  const size = 9
  const url = `${baseUrl}/api/products`
  const payload = { params: { page, size } }
  const response = await axios.get(url, payload)
  return response.data
}
export default Home
