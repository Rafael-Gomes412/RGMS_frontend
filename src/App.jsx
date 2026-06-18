import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CMen from './pages/C_men'
import CWomen from './pages/C_women'
import CAccessoire from './pages/C_accessoire'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Mentions from './pages/Mentions'
import Community from './pages/Community'

// AJOUT DES IMPORTS POUR LE BLOG
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'

function App() {
  const location = useLocation()
  const transparentPages = ['/']
  const isTransparent = transparentPages.includes(location.pathname)

  return (
    <>
      <Navbar transparent={isTransparent} />
      <div className={isTransparent ? '' : 'pt-20'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homme" element={<CMen />} />
          <Route path="/femme" element={<CWomen />} />
          <Route path="/accessoires" element={<CAccessoire />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/community" element={<Community />} />
          
         
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App