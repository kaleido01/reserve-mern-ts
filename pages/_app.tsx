import App, { AppContext } from 'next/app'
import React from 'react'
import Layout from '../components/_App/Layout'
import { parseCookies } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios, { AxiosRequestConfig } from 'axios'
import { UserType } from '../models/User'

export interface PageProps {
  user?: UserType
  children?: React.ReactNode
}
class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const { token } = parseCookies(ctx)
    let pageProps: PageProps = {}

    if (!token) {
      const isProtectedRoute = ctx.pathname === '/account' || '/create'
      if (isProtectedRoute) {
        redirectUser(ctx, '/login')
      }
    } else {
      try {
        const payload: AxiosRequestConfig = { headers: { authorization: token } }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        pageProps.user = response.data
      } catch (error) {
        console.log({ error })
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
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
