import React from 'react'
type Props = {
  product: string
}

function ProductList(props: Props) {
  const { product } = props
  return (
    <>
      <div>{product}</div>
    </>
  )
}

export default ProductList
