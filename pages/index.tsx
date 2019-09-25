import React from 'react'
import axios from 'axios'

type Product = {
  name: string
  price: number
  description: string
  sku: string
  mediaUrl: string
}
type Props = {
  products: Product[]
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

  console.log(products)
  return <div>aaa</div>
}

Home.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(url)
  return { products: response.data as Product[] }
}

export default Home
