import React from 'react'
import { Message, Segment, Form, Button, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useFormik } from 'formik'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

type payload = {
  name: string
  email: string
  password: string
}

type FormError = {
  name?: string
  email?: string
  password?: string
}

const Signup = () => {
  const initialValues: payload = {
    name: '',
    email: '',
    password: '',
  }
  const [success, setSuccess] = React.useState(false)
  const [serverError, setServerError] = React.useState('')
  const { values, submitForm, setValues, isSubmitting, errors, handleChange } = useFormik({
    initialValues,
    onSubmit: async values => {
      try {
        const url = `${baseUrl}/api/product`
        await axios.post(url, values)
        setSuccess(true)
        setValues(initialValues)
      } catch (error) {
        setServerError(catchErrors(error))
      }
    },
    validate: values => {
      const errors: FormError = {}
      if (!values.name) {
        errors.name = 'imput name'
      }
      if (!values.email) {
        errors.email = 'input email'
      }
      if (!values.password) {
        errors.password = 'input password'
      }
      console.log(errors)
      return errors
    },
  })
  return (
    <>
      <Message
        attached="top"
        icon="settings"
        header="Get started!"
        content="Create a new Account"
        color="teal"
      />
      <Form onSubmit={submitForm} error={Boolean(serverError)} success={success}>
        <Message success icon="check" header="Success!" content="Your product has been posted" />
        <Message error header="Ooops!" content={serverError} />

        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={values.name}
            error={errors.name}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            error={errors.email}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
          />
          <Button
            color="orange"
            content="Signup"
            type="submit"
            icon="signup"
            disabled={isSubmitting}
          />
        </Segment>
      </Form>

      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing User?{' '}
        <Link href="/login">
          <a>Log in here</a>
        </Link>
        instead.
      </Message>
    </>
  )
}

export default Signup
