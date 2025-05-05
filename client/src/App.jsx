import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import { BookProvider } from './context/BookContext'

export default function App() {
  return (
    <>


      <BookProvider>

        <Navbar />

        <main className='min-h-[calc(100vh-100px)] mt-16 roboto'>
          <Outlet />
        </main>

        <footer>footer</footer>

      </BookProvider>



    </>
  )
}
