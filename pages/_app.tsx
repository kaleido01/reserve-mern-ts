import App, { AppContext } from 'next/app'
import React from 'react'
import Layout from '../components/_App/Layout'
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios, { AxiosRequestConfig } from 'axios'
import { UserType } from '../models/User'
import Router from 'next/router'

export interface PageProps {
  user?: UserType
  children?: React.ReactNode
  isRootOrAdmin?: boolean
}
class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const { token } = parseCookies(ctx)
    let pageProps: PageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) {
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create'
      if (isProtectedRoute) {
        redirectUser(ctx, '/login')
      }
    } else {
      try {
        const payload: AxiosRequestConfig = { headers: { authorization: token } }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        const user: UserType = response.data
        const isRoot = user.role === 'role'
        const isAdmin = user.role === 'admin'

        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create'
        if (isNotPermitted) {
          redirectUser(ctx, '/')
        }
        pageProps.user = user
        pageProps.isRootOrAdmin = isRoot || isAdmin
      } catch (error) {
        destroyCookie(ctx, 'token')
        redirectUser(ctx, '/login')
      }
    }

    return { pageProps }
  }

  public componentDidMount() {
    window.addEventListener('storage', this.syncLogout)
  }

  public syncLogout = event => {
    if (event.key === 'logout') {
      Router.push('login')
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
