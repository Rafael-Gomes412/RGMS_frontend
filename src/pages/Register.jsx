import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import logo from '../assets/logo.svg'

function Register() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.password2) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    try {
      await api.post('/users/register/', form)
      navigate('/login')
    } catch (err) {
      setError('Une erreur est survenue. Vérifie tes informations.')
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

        <Link to="/">
          <img src={logo} alt="RGMS" className="h-12 w-auto mb-10" />
        </Link>

        <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
          Inscription
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Rejoins la communauté RGMS 🐺
        </p>

        {error && (
          <div className="w-full max-w-sm bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">

          {[
            { name: 'email', label: 'Email', type: 'email', placeholder: 'ton@email.com' },
            { name: 'username', label: 'Nom d\'utilisateur', type: 'text', placeholder: 'tonpseudo' },
            { name: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••••••' },
            { name: 'password2', label: 'Confirmer le mot de passe', type: 'password', placeholder: '••••••••••••' },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition mt-2 disabled:opacity-50"
          >
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>

        </form>

        <div className="mt-8 text-sm text-gray-400">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-black underline hover:text-gray-600">
            Se connecter
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register