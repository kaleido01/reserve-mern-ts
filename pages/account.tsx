import React from 'react'
import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import { PageProps } from './_app'
import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import { OrderType } from '../models/Order'

interface Props extends PageProps {
  orders: OrderType[]
}

const Account = ({ user, orders }: Props) => {
  return (
    <>
      <AccountHeader user={user} />
      <AccountOrders orders={orders} />
    </>
  )
}

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { orders: [] }
  }
  const payload = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${baseUrl}/api/orders`
  const response = await axios.get(url, payload)
  return response.data
}

export default Account
