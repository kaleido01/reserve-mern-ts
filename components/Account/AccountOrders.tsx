import React from 'react'
import { OrderType } from '../../models/Order'
import { Header, Icon, Segment, Button, Accordion, Label, List, Image } from 'semantic-ui-react'
import { useRouter } from 'next/router'

type Props = {
  orders: OrderType[]
}

const mapOrdersToPanels = (orders: OrderType[]) => {
  console.log(orders)
  return orders.map(order => ({
    key: order._id,
    title: {
      content: <Label color="blue" content={order.createdAt} />,
    },
    content: {
      content: (
        <>
          <List.Header as="h3">
            Total : $ {order.total}
            <Label
              content={order.email}
              icon="mail"
              basic
              horizontal
              style={{ marginLeft: '1em' }}
            />
          </List.Header>
          <List>
            {order.products.map(product => (
              <List.Item key={product.product.sku}>
                <Image avatar src={product.product.mediaUrl} />
                <List.Content>
                  <List.Header>{product.product.name}</List.Header>
                  <List.Description>
                    {product.quantity} ・ ${product.product.price}
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <Label tag color="red" size="tiny">
                    {product.product.sku}
                  </Label>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </>
      ),
    },
  }))
}

const AccountOrders = ({ orders }: Props) => {
  const router = useRouter()
  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No past orders
          </Header>
          <div>
            <Button onClick={() => router.push('/')} color="orange" content="View Products" />
          </div>
        </Segment>
      ) : (
        <Accordion fluid styled panels={mapOrdersToPanels(orders)} />
      )}
    </>
  )
}

export default AccountOrders
