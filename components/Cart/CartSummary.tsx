import React from 'react'
import { Divider, Segment, Button } from 'semantic-ui-react'
import { Product } from '../../models/Cart'
import { PageProps } from '../../pages/_app'
import calculateCartTotal from '../../utils/calculateCartTotal'
interface Props extends PageProps {
  products: Product[]
}
const CartSummary = ({ products }: Props) => {
  const [isCartEmpty, setCartEmpty] = React.useState(false)
  const [cartAmount, setCartAmount] = React.useState('')
  const [stripeAmount, setStripeAmount] = React.useState(0)

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <Button
          icon="cart"
          color="teal"
          floated={'right'}
          content="Checkout"
          disabled={isCartEmpty}
        />
      </Segment>
    </>
  )
}

export default CartSummary
