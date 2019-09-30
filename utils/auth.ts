import cookie from 'js-cookie'
import Router from 'next/router'
import { NextPageContext } from 'next'

export const handleLogin = (token: string) => {
  cookie.set('token', token)
  Router.push('/account')
}

export const redirectUser = (ctx: NextPageContext, location: string) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

export const handleLogut = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', String(Date.now()))
  Router.push('/login')
}
