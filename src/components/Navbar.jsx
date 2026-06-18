import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { LuUser, LuShoppingCart, LuMenu, LuX } from 'react-icons/lu'
import logo from '../assets/logo.png'

function Navbar({ transparent = false }) {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false) // État pour le menu mobile

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/login')
  }

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-50 shadow-sm transition-all duration-300 ${
        transparent
          ? 'bg-white/5 backdrop-blur-[2px] text-white rounded-b-3xl'
          : 'bg-white/5 backdrop-blur-[2px] text-black rounded-b-3xl'
      }`}>
        <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between">

          {/* Gauche : Bouton Burger (Uniquement sur Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden order-1 hover:opacity-60 transition"
          >
            {isOpen ? <LuX size={26} /> : <LuMenu size={26} />}
          </button>

          {/* Centre sur mobile / Gauche sur PC : Logo */}
          <Link to="/" className="order-2 md:order-1 mx-auto md:mx-0" onClick={() => setIsOpen(false)}>
            <img
              src={logo}
              alt="RGMS"
              className={`h-10 md:h-12 w-auto ${transparent ? 'invert' : ''}`}
            />
          </Link>

          {/* Navigation centrale (Masquée sur Mobile, visible sur PC) */}
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase order-2">
            <Link to="/homme" className="hover:opacity-60 transition">Homme</Link>
            <Link to="/femme" className="hover:opacity-60 transition">Femme</Link>
            <Link to="/accessoires" className="hover:opacity-60 transition">Accessoires</Link>
          </div>

          {/* Droite : Compte + Panier */}
          <div className="flex items-center gap-4 md:gap-6 text-sm order-3">
            {user ? (
              <>
                <Link to="/profile" className="hidden md:block hover:opacity-60 transition">
                  {user.username}
                </Link>
                <button onClick={handleLogout} className="hidden md:block hover:text-red-500 transition">
                  Déconnexion
                </button>
                {/* Icône de secours profil sur mobile si connecté */}
                <Link to="/profile" className="md:hidden hover:opacity-60 transition">
                  <LuUser size={22} />
                </Link>
              </>
            ) : (
              <Link to="/login" className="hover:opacity-60 transition">
                <LuUser size={22} />
              </Link>
            )}

            <Link to="/cart" className="relative hover:opacity-60 transition">
              <LuShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </nav>

      {/* 📱 Menu rideau Mobile (S'ouvre sur tout l'écran en fondu/glissé) */}
      <div className={`fixed inset-0 z-40 bg-black/90 text-white backdrop-blur-md transition-all duration-300 md:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-xl font-semibold tracking-widest uppercase">
          <Link to="/homme" onClick={() => setIsOpen(false)} className="hover:opacity-60 transition">Homme</Link>
          <Link to="/femme" onClick={() => setIsOpen(false)} className="hover:opacity-60 transition">Femme</Link>
          <Link to="/accessoires" onClick={() => setIsOpen(false)} className="hover:opacity-60 transition">Accessoires</Link>
          
          {user && (
            <button 
              onClick={handleLogout} 
              className="text-red-400 text-sm font-medium tracking-wide normal-case mt-4"
            >
              Se déconnecter ({user.username})
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar