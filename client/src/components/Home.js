import React from 'react'
import Header from './Header'
import Product from './Product'

function Home() {
  return (
    <>
    <div className='flex justify-center mt-4 border-t'>

      <Header/>
    </div>
    <div className='flex justify-center'>

      <Product/>
    </div>
    </>
  )
}

export default Home