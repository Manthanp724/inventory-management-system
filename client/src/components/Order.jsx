import React from 'react'
import Header from '../utils/Header'
import Button from '@mui/material/Button';


const Order = () => {
  return (
    <div>
      <Header/>
      <div>
        <hr className='h-3 bg-gray-100 w-full border-none' />
      </div>
      <div className='flex justify-between items-center p-4 ml-6 mr-6'>
        <h1 className='text-3xl font-semibold'>Orders</h1>
        <Button variant="contained">+New Order</Button>
      </div>
      <div>
        <hr className='h-1 bg-gray-100 w-full border-none' />
      </div>

      <div className='p-4'>
      </div>

    </div>
  )
}

export default Order
