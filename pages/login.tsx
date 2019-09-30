import React from 'react'
import { Message, Segment, Form, Button, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useFormik } from 'formik'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'
import { handleLogin } from '../utils/auth'

type payload = {
  email: string
  password: string
}

type FormError = {
  email?: string
  password?: string
}

const Login = () => {
  const initialValues: payload = {
    email: '',
    password: '',
  }
  const [success, setSuccess] = React.useState(false)
  const [serverError, setServerError] = React.useState('')
  const { values, submitForm, setValues, isSubmitting, errors, handleChange } = useFormik({
    initialValues,
    onSubmit: async values => {
      try {
        const url = `${baseUrl}/api/login`
        const response = await axios.post(url, { ...values })
        handleLogin(response.data)

        setSuccess(true)
        setValues(initialValues)
      } catch (error) {
        setServerError(catchErrors(error))
      }
    },
    validate: values => {
      const errors: FormError = {}
      if (!values.email) {
        errors.email = 'input email'
      }
      if (!values.password) {
        errors.password = 'input password'
      }
      return errors
    },
  })
  return (
    <>
      <Message
        attached="top"
        icon="privacy"
        header="welcome back!"
        content="Login in with email and password"
        color="blue"
      />
      <Form onSubmit={submitForm} error={Boolean(serverError)} success={success}>
        <Message success icon="check" header="Success!" content="Your product has been posted" />
        <Message error header="Ooops!" content={serverError} />

        <Segment>
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
            content="Login"
            type="submit"
            icon="sign in"
            disabled={isSubmitting}
          />
        </Segment>
      </Form>

      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{' '}
        <Link href="/login">
          <a>sign up here</a>
        </Link>
        instead.
      </Message>
    </>
  )
}

export default Login
