import React from 'react'
import { ProductType } from '../../models/Product'
import { Card } from 'semantic-ui-react'
type Props = {
  products: ProductType[]
}

function ProductList(props: Props) {
  const { products } = props

  const mapProductsToItems = (products: ProductType[]) => {
    return products.map(p => {
      return {
        header: p.name,
        image: p.mediaUrl,
        color: 'teal',
        fluid: true,
        chiledKey: p._id,
        href: `/product?_id=${p._id}`,
        meta: `$${p.price}`,
      }
    })
  }

  return <Card.Group itemsPerRow={3} centered stackable items={mapProductsToItems(products)} />
}

export default ProductList
