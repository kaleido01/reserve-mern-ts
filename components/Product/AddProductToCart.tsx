import React from 'react'
import { Input } from 'semantic-ui-react'
import { UserType } from '../../models/User'
import { useRouter } from 'next/router'
import axios, { AxiosRequestConfig } from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import catchErrors from '../../utils/catchErrors'
type Props = {
  productId: string
  user?: UserType
}
const AddProductToCart = (props: Props) => {
  const { user, productId } = props
  const [quantity, setQuantity] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const timeout = success && setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(timeout)
  }, [success])

  const handleAddProductToCart = async () => {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = { productId, quantity }
      const token = cookie.get('token')
      const header: AxiosRequestConfig = { headers: { Authorization: token } }
      await axios.put(url, payload, header)
      setSuccess(true)
    } catch (error) {
      window.alert(catchErrors(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Input
      type="number"
      min="1"
      onChange={e => setQuantity(Number(e.target.value))}
      value={quantity}
      placeholger="Quantity"
      action={
        user && success
          ? {
              color: 'blue',
              content: 'Item Added',
              icon: 'plus cart',
              disabled: true,
            }
          : user
          ? {
              color: 'orange',
              content: 'Add to Cart',
              icon: 'plus cart',
              onClick: handleAddProductToCart,
              loading,
              disabled: loading,
            }
          : {
              color: 'blue',
              content: 'Sign up To Purchase',
              icon: 'signup',
              onClick: () => router.push('/login'),
            }
      }
    ></Input>
  )
}

export default AddProductToCart
