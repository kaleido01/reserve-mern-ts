import React from 'react'
import { ProductType } from '../../models/Product'
import { Header, Button } from 'semantic-ui-react'
type Props = {
  product: ProductType
}
const ProductAttributest = ({ product }: Props) => {
  const { description } = product
  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button icon="trash alternate outline" color="red" content="Delete Product" />
    </>
  )
}

export default ProductAttributest
