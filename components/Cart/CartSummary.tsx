import React from 'react'
import { Divider, Segment, Button } from 'semantic-ui-react'
import { Product } from '../../models/Cart'
import { PageProps } from '../../pages/_app'
import calculateCartTotal from '../../utils/calculateCartTotal'
import StripeCheckout, { Token } from 'react-stripe-checkout'
interface Props extends PageProps {
  products: Product[]
  handleCheckout: (paymentData: Token) => void
  success: boolean
}
const CartSummary = ({ products, handleCheckout, success }: Props) => {
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
        <StripeCheckout
          name="React Reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ''}
          currency="USD"
          shippingAddress
          billingAddress
          zipCode
          token={handleCheckout}
          triggerEvent="onClick"
          stripeKey="pk_test_YVOP2AwvKeskDGToZ5DnKcdi00vnf5m7LK"
        >
          <Button
            icon="cart"
            color="teal"
            floated={'right'}
            content="Checkout"
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </>
  )
}

export default CartSummary
