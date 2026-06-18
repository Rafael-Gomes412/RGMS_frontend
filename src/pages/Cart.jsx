import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { LuTrash2 } from 'react-icons/lu'

function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const shipping = total >= 60 ? 0 : 4.99

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400">
          Votre panier est vide
        </p>
        <h2 className="text-2xl font-bold uppercase tracking-widest">
          Rien ici pour l'instant
        </h2>
        <Link
          to="/femme"
          className="border border-black px-10 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
        >
          Découvrir la collection
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen px-8 py-10">

      {/* Titre */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-1">Mon</p>
        <h1 className="text-3xl font-bold uppercase tracking-widest">Panier</h1>
        <p className="text-sm text-gray-400 mt-1">{cart.length} article{cart.length > 1 ? 's' : ''}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* GAUCHE — Articles */}
        <div className="flex-1 flex flex-col gap-6">

          <div className="hidden md:grid grid-cols-12 text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">
            <span className="col-span-6">Produit</span>
            <span className="col-span-2 text-center">Taille</span>
            <span className="col-span-2 text-center">Quantité</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          {cart.map((item) => (
            <div key={item.variant.id} className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 pb-6">

              <div className="col-span-6 flex gap-4 items-center">
                <div className="w-20 h-24 bg-gray-100 overflow-hidden shrink-0">
                  <img
                    src={item.product.images?.[0]?.image || item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium uppercase tracking-wide">
                    {item.product.name}
                  </p>
                  <p className="text-sm font-medium">{item.product.price}€</p>
                  <button
                    onClick={() => removeFromCart(item.variant.id)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition mt-1 w-fit"
                  >
                    <LuTrash2 size={12} />
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="col-span-2 text-center">
                <span className="text-sm border border-gray-200 px-3 py-1">
                  {item.variant.size?.name || item.variant.size}
                </span>
              </div>

              <div className="col-span-2 flex items-center justify-center border border-gray-200 w-fit mx-auto">
                <button
                  onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                  className="w-8 h-8 hover:bg-gray-100 transition text-lg"
                >−</button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                  className="w-8 h-8 hover:bg-gray-100 transition text-lg"
                >+</button>
              </div>

              <div className="col-span-2 text-right">
                <span className="text-sm font-medium">
                  {(item.product.price * item.quantity).toFixed(2)}€
                </span>
              </div>

            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-red-500 transition underline w-fit"
          >
            Vider le panier
          </button>

        </div>

        {/* DROITE — Résumé */}
        <div className="lg:w-80 shrink-0">
          <div className="border border-gray-100 p-6 flex flex-col gap-4 sticky top-24">

            <h2 className="text-sm uppercase tracking-widest font-bold mb-2">Résumé</h2>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Sous-total</span>
              <span>{total.toFixed(2)}€</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Livraison</span>
              <span className={shipping === 0 ? 'text-green-500' : ''}>
                {shipping === 0 ? 'Gratuite 🎉' : `${shipping}€`}
              </span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-gray-400">
                Plus que {(60 - total).toFixed(2)}€ pour la livraison gratuite
              </p>
            )}

            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <span className="text-sm font-bold uppercase tracking-widest">Total</span>
              <span className="text-sm font-bold">{(total + shipping).toFixed(2)}€</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition mt-2"
            >
              {user ? 'Commander' : 'Se connecter pour commander'}
            </button>

            <Link
              to="/femme"
              className="text-center text-xs text-gray-400 hover:text-black transition underline"
            >
              Continuer mes achats
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart