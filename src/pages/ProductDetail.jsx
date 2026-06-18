import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../api/axios'

function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}/`)
        setProduct(res.data)
      } catch (err) {
        console.error('Erreur chargement produit', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addToCart(selectedVariant, product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-widest uppercase animate-pulse">
          Chargement...
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Produit introuvable.</p>
      </div>
    )
  }

  // Toutes les images du produit
  const images = product.images?.length > 0
  ? product.images.map(img => img.image)
  : product.image
    ? [product.image]
    : []

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col md:flex-row w-full">

        {/* GAUCHE — Images */}
        <div className="md:w-1/2 flex gap-3 p-8">

          {/* Thumbnails verticales */}
          {images.length > 1 && (
            <div className="flex flex-col gap-3 w-20 shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition ${
                    selectedImage === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`vue ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Grande image */}
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-gray-100 sticky top-24 h-fit">
            <img
              src={images[selectedImage] || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

        </div>

        {/* DROITE — Infos produit */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col gap-6">

          {/* Nom + prix */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
              RGMS — {product.category?.name}
            </p>
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-medium">{product.price}€</span>
            </div>
          </div>

          {/* Tailles */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Taille
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants?.map(variant => (
                <button
                  key={variant.id}
                  disabled={variant.stock === 0}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-14 h-14 text-sm border-2 transition ${
                    variant.stock === 0
                      ? 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                      : selectedVariant?.id === variant.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {variant.size?.name}
                </button>
              ))}
            </div>
            {!selectedVariant && (
              <p className="text-xs text-gray-400 mt-2">Veuillez sélectionner une taille</p>
            )}
          </div>

          {/* Quantité */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Quantité
            </p>
            <div className="flex items-center border border-gray-200 w-fit">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 text-lg hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 text-lg hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Bouton ajout panier */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className={`w-full py-4 text-sm uppercase tracking-widest transition ${
              !selectedVariant
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {!selectedVariant
              ? 'Sélectionner une taille'
              : added
                ? '✓ Ajouté au panier'
                : 'Ajouter au panier'
            }
          </button>

          {/* Description */}
          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3">
              Description
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {product.description || 'Aucune description disponible.'}
            </p>
          </div>

          {/* Livraison */}
          <div className="border-t border-gray-100 pt-6 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest font-semibold mb-2">
              Livraison & Retours
            </p>
            <p className="text-xs text-gray-400">🚚 Livraison gratuite dès 60€</p>
            <p className="text-xs text-gray-400">↩️ Retours gratuits sous 30 jours</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail