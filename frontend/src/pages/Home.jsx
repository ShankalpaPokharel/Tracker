import React from 'react'
import { LeftNavBar,Welcome } from '../components'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='container max-w-none'>
    <div className='flex' >
    <LeftNavBar/>

    <Outlet/>
    </div>
    </div>
    
   
    </>
  )
}

export default Home