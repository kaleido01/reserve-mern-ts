import React from 'react'
import { Input } from 'semantic-ui-react'

type Props = {
  productId: string
}
const AddProductToCart = ({ productId }: Props) => {
  return (
    <Input
      type="number"
      min="1"
      value="1"
      placeholger="Quantity"
      action={{
        color: 'orange',
        content: 'Add to Cart',
        icon: 'plus cart',
      }}
    ></Input>
  )
}

export default AddProductToCart
