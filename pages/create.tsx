import React from 'react'
import { Header, Icon, Form, Input, Button, TextArea, Image, Message } from 'semantic-ui-react'
import { useFormik } from 'formik'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'

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
  const [loading, setLoading] = React.useState(false)
  const { values, setFieldValue, submitForm, setValues } = useFormik({
    initialValues,
    onSubmit: async values => {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const mediaUrl = await handleImageUpload()
      console.log({ mediaUrl })

      const url = `${baseUrl}/api/product`
      const { name, price, description } = values
      const response = await axios.post(url, { name, price, description, mediaUrl })
      console.log({ response })
      setSuccess(true)
      setLoading(false)

      setValues(initialValues)
    },
  })
  console.log(values)
  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', values.media)
    data.append('upload_preset', 'reactreserve')
    data.append('cloud_name', 'da9s05mht')

    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl: string = response.data.url
    return mediaUrl
  }

  return (
    <div>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={submitForm} loading={loading}>
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
          disabled={loading}
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
