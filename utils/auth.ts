import cookie from 'js-cookie'
import Router from 'next/router'

const handleLogin = (token: string) => {
  cookie.set('token', token)
  Router.push('/account')
}

export default handleLogin
