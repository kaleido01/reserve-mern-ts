import React from 'react'
import { Header, Icon, Form, Input, Button, TextArea, Image, Message } from 'semantic-ui-react'
import { useFormik } from 'formik'

type payload = {
  name: string
  price: number
  media: File
  description: string
}
const CreateProduct = () => {
  const initialValues: payload = {
    name: '',
    price: 0,
    media: undefined,
    description: '',
  }
  const [mediaPreview, setMediaPreview] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const { values, setFieldValue, submitForm, setValues } = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(values)
      setSuccess(true)
      setValues(initialValues)
    },
  })
  console.log(values)
  return (
    <div>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={submitForm}>
        <Message success icon="check" header="Success!" content="Your product has been posted" />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={e => setFieldValue('name', e.target.value)}
            value={values.name}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            type="number"
            onChange={e => setFieldValue('price', e.target.value)}
            value={values.price}
            step={0.01}
          />
          <Form.Field
            control={Input}
            name="medea"
            label="Media"
            placeholder="Price"
            type="file"
            accept="image/*"
            content="Select Image"
            onChange={e => {
              setFieldValue('media', e.target.files[0])
              setMediaPreview(window.URL.createObjectURL(e.target.files[0]))
            }}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={e => setFieldValue('description', e.target.value)}
          value={values.description}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submite"
        />
      </Form>
    </div>
  )
}

export default CreateProduct
