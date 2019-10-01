import React from 'react'
import { Segment, Header, Icon, Button, Item } from 'semantic-ui-react'
import { PageProps } from '../../pages/_app'
import { Product } from '../../models/Cart'
import { useRouter } from 'next/router'
import { ObjectId } from 'mongodb'
interface Props extends PageProps {
  products: Product[]
  handleRemoveFromCart: (productId: ObjectId) => void
}
const CartItemList = ({ products, user, handleRemoveFromCart }: Props) => {
  const router = useRouter()

  const mapCartProductsToItem = (products: Product[]) => {
    return products.map(p => ({
      key: p.product._id,
      header: (
        <Item.Header as="a" onClick={() => router.push(`/product?_id=${p.product._id}`)}>
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: (
        <div>
          <span>{p.quantity}</span> &times; <span>${p.product.price}</span>
        </div>
      ),
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromCart(p.product._id)}
        />
      ),
    }))
  }
  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No product in your cart.Add some!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push('/')}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push('/login')}>
              {' '}
              Login to Add Products{' '}
            </Button>
          )}
        </div>
      </Segment>
    )
  }
  return <Item.Group items={mapCartProductsToItem(products)} divided />
}

export default CartItemList
