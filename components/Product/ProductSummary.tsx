import React from 'react'
import { ProductType } from '../../models/Product'
import { Item, Label } from 'semantic-ui-react'
import AddProductToCart from './AddProductToCart'

type Props = {
  product: ProductType
}
const ProductSummary = (props: Props) => {
  const { name, mediaUrl, sku, price, _id } = props.product
  return (
    <Item.Group>
      <Item>
        <Item.Image size={'medium'} src={mediaUrl}></Item.Image>
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default ProductSummary
