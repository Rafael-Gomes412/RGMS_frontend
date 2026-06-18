import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex -mt-20">

      {/* Gauche — Image */}
      <div className="hidden md:flex w-1/2 bg-black">
        <img
          src="/src/assets/hero-femme.jpg"
          alt="RGMS"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Droite — Formulaire */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-16 bg-white">

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="RGMS" className="h-12 w-auto mb-10" />
        </Link>

        <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
          Connexion
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Content de te revoir 👋
        </p>

        {/* Erreur */}
        {error && (
          <div className="w-full max-w-sm bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition mt-2 disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        {/* Liens */}
        <div className="flex flex-col items-center gap-3 mt-8 text-sm text-gray-400">
          <span>
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-black underline hover:text-gray-600">
              S'inscrire
            </Link>
          </span>
          <Link to="/" className="hover:text-black transition">
            Mot de passe oublié ?
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login