import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import IntroReveal from './components/IntroReveal.tsx'
import { CartProvider } from './pages/shop/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* Intro overlay is intentionally OUTSIDE StrictMode so its shader + sequence mount
        exactly once. StrictMode's dev-only double-mount would otherwise recreate the WebGL
        canvas and replay the intro. The hasStartedRef guard inside is a second safeguard. */}
    <IntroReveal />
    <React.StrictMode>
      {/* CartProvider sits ABOVE the router so the cart survives navigation between the
          Vault (home) and the shop — adding a grail on the home page and then opening
          /shop keeps the same line items. */}
      <CartProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </React.StrictMode>
  </>,
)
