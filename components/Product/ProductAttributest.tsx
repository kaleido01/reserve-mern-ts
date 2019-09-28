import React from 'react'
import { ProductType } from '../../models/Product'
import { Header, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { useRouter } from 'next/router'
type Props = {
  product: ProductType
}
const ProductAttributest = ({ product }: Props) => {
  const [open, setOpen] = React.useState(false)
  const { description, _id } = product
  const router = useRouter()

  const handleDelete = async () => {
    const payload = { params: { _id } }
    const url = `${baseUrl}/api/product`
    await axios.delete(url, payload)
    router.push('/')
  }
  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
        onClick={() => setOpen(true)}
      />
      <Modal open={open} dimmer={'blurring'} style={{ top: '38%' }}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={() => setOpen(false)} />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ProductAttributest
