import React from 'react'
import { Header, Icon, Form, Input, Button, TextArea, Image, Message } from 'semantic-ui-react'
import { useFormik } from 'formik'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

type payload = {
  name: string
  price: number
  media: File
  description: string
}

type FormError = {
  name?: string
  price?: number
  media?: File
  description?: string
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
  const [serverError, setServerError] = React.useState('')
  const {
    values,
    setFieldValue,
    submitForm,
    setValues,
    isSubmitting,
    errors,
    touched,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    onSubmit: async values => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const mediaUrl = await handleImageUpload()
        const url = `${baseUrl}/api/product`
        const { name, price, description } = values
        await axios.post(url, { name, price, description, mediaUrl })
        setSuccess(true)
        setValues(initialValues)
      } catch (error) {
        setServerError(catchErrors(error))
      }
    },
    validate: values => {
      const errors: FormError = {}
      if (!values.name) {
        errors.name = 'aaaaaa'
      }
      return errors
    },
  })
  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', values.media)
    data.append('upload_preset', 'reactreserve')
    data.append('cloud_name', 'da9s05mht')

    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl: string = response.data.url
    return mediaUrl
  }
  console.log({ errors, touched })
  return (
    <div>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form
        success={success}
        onSubmit={submitForm}
        loading={isSubmitting}
        error={Boolean(serverError)}
      >
        <Message success icon="check" header="Success!" content="Your product has been posted" />
        <Message error header="Ooops!" content={serverError} />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            error={errors.name}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            value={values.price}
            step={0.01}
          />
          <Form.Field
            control={Input}
            name="media"
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
          onChange={handleChange}
          value={values.description}
        />
        <Form.Field
          control={Button}
          disabled={isSubmitting}
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
