import React from 'react'
import  './Home.css'
import Layout from './Layout'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      
      <div className='home-container'>
        <Layout />
        
        

        <Outlet />

      </div>
    </div>

  )
}
