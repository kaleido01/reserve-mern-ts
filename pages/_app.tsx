import App from 'next/app'
import React from 'react'
import Layout from '../components/_App/Layout'

interface Props {
  Component: any
}
class MyApp extends App<Props> {
  public static async getInitialProps(ctx: any) {
    let pageProps = {}

    if (ctx.Component.getInitialProps) {
      pageProps = await ctx.Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps } = this.props

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
