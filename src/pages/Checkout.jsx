import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// ==========================================
// COMPOSANT : FORMULAIRE DE PAIEMENT STRIPE
// ==========================================
function CheckoutForm({ total, address, cart, shipping }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    // Validation rapide des champs d'adresse requis
    if (!address.full_name || !address.street || !address.city || !address.postal_code) {
      setError('Veuillez remplir correctement toutes les informations de livraison.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 1. Valider le PaymentElement d'abord (Front-end)
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message)
        setLoading(false)
        return
      }

      // 2. Déclencher la création de la commande ET du PaymentIntent côté Django en UNE SEULE FOIS
      // Ton backend devra renvoyer { order_id: ..., client_secret: ... }
      const { data } = await api.post('/orders/checkout-submit/', {
        address,
        shipping_cost: shipping,
        total_amount: total,
        items: cart.map(item => ({
          variant_id: item.variant.id,
          quantity: item.quantity,
        }))
      })

      // 3. Confirmer le paiement Stripe avec le client_secret tout juste reçu
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/profile`,
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message)
        return
      }

      // 4. Confirmer le statut côté Django (Paiement réussi)
      await api.post('/orders/confirm/', { order_id: data.order_id })

      clearCart()
      navigate('/profile')

    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors du traitement de la commande.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-400">
          Informations de paiement
        </label>
        <div className="border border-gray-200 px-4 py-4 focus-within:border-black transition">
          <PaymentElement />
        </div>
        <p className="text-xs text-gray-400">🔒 Paiement sécurisé et crypté par Stripe</p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? 'Traitement en cours...' : `Payer ${total}€`}
      </button>
    </form>
  )
}

// ==========================================
// COMPOSANT PRINCIPAL : PAGES CHECKOUT
// ==========================================
function Checkout() {
  const { cart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [savedAddresses, setSavedAddresses] = useState([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  
  const [address, setAddress] = useState({
    full_name: user?.username || '',
    street: '',
    city: '',
    postal_code: '',
    country: 'France',
  })

  const shipping = total >= 60 ? 0 : 4.99
  const finalTotal = (total + shipping).toFixed(2)

  // Configuration des options Stripe en mode Deferred (Pas besoin de clientSecret immédiat)
  const stripeOptions = {
    mode: 'payment',
    amount: Math.round(parseFloat(finalTotal) * 100), // Stripe veut des centimes (ex: 45.99€ -> 4599)
    currency: 'eur',
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (cart.length === 0) {
      navigate('/cart')
      return
    }
    fetchSavedAddresses()
  }, [])

  // Récupérer le carnet d'adresses de l'utilisateur
  const fetchSavedAddresses = async () => {
    try {
      const res = await api.get('/users/addresses/') // L'URL qu'on vient de corriger ensemble !
      const addressList = res.data.results || res.data
      setSavedAddresses(addressList)
      
      // S'il y a une adresse par défaut, on l'applique directement
      const defaultAddr = addressList.find(a => a.is_default) || addressList[0]
      if (defaultAddr) {
        setAddress({
          full_name: defaultAddr.full_name,
          street: defaultAddr.street,
          city: defaultAddr.city,
          postal_code: defaultAddr.postal_code,
          country: defaultAddr.country
        })
      }
    } catch (err) {
      console.error('Impossible de charger les adresses', err)
    } finally {
      setLoadingAddresses(false)
    }
  }

  const handleSelectSavedAddress = (addr) => {
    setAddress({
      full_name: addr.full_name,
      street: addr.street,
      city: addr.city,
      postal_code: addr.postal_code,
      country: addr.country
    })
  }

  return (
    <div className="w-full min-h-screen px-8 py-10">
      <div className="mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-1">Finaliser</p>
        <h1 className="text-3xl font-bold uppercase tracking-widest">Commande</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* GAUCHE — Adresse + Paiement */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Sélection Adresses Enregistrées */}
          {savedAddresses.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-sm uppercase tracking-widest font-bold">Vos adresses enregistrées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedAddresses.map(addr => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleSelectSavedAddress(addr)}
                    className={`p-4 border text-left transition text-sm ${
                      address.street === addr.street ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <p className="font-medium">{addr.full_name}</p>
                    <p className="text-xs text-gray-400 mt-1">{addr.street}, {addr.postal_code} {addr.city}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulaire Adresse de Livraison */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-widest font-bold">Adresse de livraison</h2>
            {[
              { name: 'full_name', label: 'Nom complet', placeholder: 'Jean Dupont' },
              { name: 'street', label: 'Adresse', placeholder: '12 rue de la Paix' },
              { name: 'city', label: 'Ville', placeholder: 'Paris' },
              { name: 'postal_code', label: 'Code postal', placeholder: '75001' },
              { name: 'country', label: 'Pays', placeholder: 'France' },
            ].map(field => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-gray-400">{field.label}</label>
                <input
                  type="text"
                  required
                  value={address[field.name]}
                  onChange={(e) => setAddress({ ...address, [field.name]: e.target.value })}
                  placeholder={field.placeholder}
                  className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>
            ))}
          </div>

          {/* Paiement Stripe */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-widest font-bold">Paiement</h2>
            {/* Elements englobe désormais directement le formulaire grâce au mode deferred */}
            <Elements stripe={stripePromise} options={stripeOptions}>
              <CheckoutForm 
                total={finalTotal} 
                address={address} 
                cart={cart} 
                shipping={shipping} 
              />
            </Elements>
          </div>
        </div>

        {/* DROITE — Résumé */}
        <div className="lg:w-80 shrink-0">
          <div className="border border-gray-100 p-6 flex flex-col gap-4 sticky top-24 bg-white">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-2">Résumé</h2>

            {cart.map(item => (
              <div key={item.variant.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity}x {item.product.name}</span>
                <span>{(item.product.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
              <span className="text-gray-400">Livraison</span>
              <span className={shipping === 0 ? 'text-green-500 font-medium' : ''}>
                {shipping === 0 ? 'Gratuite 🎉' : `${shipping}€`}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="text-sm font-bold uppercase tracking-widest">Total</span>
              <span className="text-sm font-bold">{finalTotal}€</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout