import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import { ProductType } from '../models/Product'
import baseUrl from '../utils/baseUrl'

type Product = {
  name: string
  price: number
  description: string
  sku: string
  mediaUrl: string
}
type Props = {
  products: ProductType[]
}

function Home(props: Props) {
  const { products } = props
  // React.useEffect(() => {
  //   function getProducts() {
  //     const url = 'http://localhost:3000/api/products'
  //     axios.get(url)
  //   }
  //   getProducts()
  // }, [])

  return <ProductList products={products} />
}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`
  const response = await axios.get(url)
  return { products: response.data as Product[] }
}

export default Home
