import React from 'react'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'

import Header from './Header'
import HeadContent from './HeadContent'
import { PageProps } from '../../pages/_app'

function Layout({ children, user, isRootOrAdmin }: PageProps) {
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>ReactReserve</title>
      </Head>
      <Header user={user} isRootOrAdmin={isRootOrAdmin} />
      <Container text style={{ paddingTop: '1em' }}>
        {children}
      </Container>
    </>
  )
}

export default Layout
