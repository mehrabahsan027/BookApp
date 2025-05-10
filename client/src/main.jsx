import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/home/Home.jsx';
import Shop from './pages/shop/Shop.jsx';
import Cart from './pages/shop/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home/>} />

          <Route path='/about' element={<div className='text-4xl roboto'>About</div>} />
          <Route path='/books' element={<Shop/>} />
          <Route path="/add-book" element={<div>Add book</div>} />
          <Route path="/cart" element={<Cart/>} />
          


        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
