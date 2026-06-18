import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { LuUser, LuShoppingCart } from 'react-icons/lu'
import logo from '../assets/logo.png'

function Navbar({ transparent = false }) {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 shadow-sm transition-all duration-300 ${
      transparent
        ? 'bg-white/5 backdrop-blur-[2px] text-white rounded-3xl'
        : 'bg-white/5 backdrop-blur-[2px] text-black rounded-3xl'
    }`}>
      <div className="w-full px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="RGMS"
            className={`h-12 w-auto ${transparent ? 'invert' : ''}`}
          />
        </Link>

        {/* Navigation centrale */}
        <div className="flex gap-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/homme" className="hover:opacity-60 transition">Homme</Link>
          <Link to="/femme" className="hover:opacity-60 transition">Femme</Link>
          <Link to="/accessoires" className="hover:opacity-60 transition">Accessoires</Link>
        </div>

        {/* Droite : compte + panier */}
        <div className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link to="/profile" className="hover:opacity-60 transition">
                {user.username}
              </Link>
              <button onClick={handleLogout} className="hover:text-red-500 transition">
                Déconnexion
              </button>
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
  )
}

export default Navbar