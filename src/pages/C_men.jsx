import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuSlidersHorizontal, LuX } from 'react-icons/lu'
import api from '../api/axios'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function CMen() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [maxPrice, setMaxPrice] = useState(200)
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false) // ← nouveau

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products/?category=homme')
        setProducts(res.data.results || res.data)
      } catch (err) {
        console.error('Erreur chargement produits', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  let filtered = products.filter(p => {
    if (maxPrice && p.price > maxPrice) return false
    return true
  })

  if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <div className="w-full min-h-screen">

      {/* Header */}
      <div className="w-full px-4 md:px-8 py-8 border-b border-gray-100 flex justify-between items-end">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-1">Collection</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">Homme</h1>
          <p className="text-sm text-gray-400 mt-1">{filtered.length} produits</p>
        </div>

        {/* Bouton filtres mobile */}
        <button
          onClick={() => setShowFilters(true)}
          className="md:hidden flex items-center gap-2 border border-gray-200 px-4 py-2 text-xs uppercase tracking-widest"
        >
          <LuSlidersHorizontal size={14} />
          Filtres
        </button>
      </div>

      {/* Drawer filtres mobile */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-widest">Filtres</h2>
              <button onClick={() => setShowFilters(false)}>
                <LuX size={20} />
              </button>
            </div>

            {/* Tri */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">Trier par</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
              >
                <option value="default">Par défaut</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
              </select>
            </div>

            {/* Prix */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
                Prix max — {maxPrice}€
              </h3>
              <input
                type="range" min={0} max={200} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0€</span><span>200€</span>
              </div>
            </div>

            {/* Tailles */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">Tailles</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 text-xs border transition ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {(selectedSizes.length > 0 || maxPrice < 200) && (
              <button
                onClick={() => { setSelectedSizes([]); setMaxPrice(200) }}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition underline"
              >
                Réinitialiser
              </button>
            )}

            <button
              onClick={() => setShowFilters(false)}
              className="bg-black text-white py-3 text-sm uppercase tracking-widest mt-auto"
            >
              Voir {filtered.length} produits
            </button>
          </div>
        </div>
      )}

      <div className="flex w-full px-4 md:px-8 py-8 gap-10">

        {/* SIDEBAR desktop uniquement */}
        <aside className="hidden md:flex w-64 shrink-0 sticky top-24 h-fit flex-col gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">Trier par</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
            >
              <option value="default">Par défaut</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Prix max — {maxPrice}€
            </h3>
            <input
              type="range" min={0} max={200} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0€</span><span>200€</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">Tailles</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 text-xs border transition ${
                    selectedSizes.includes(size)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {(selectedSizes.length > 0 || maxPrice < 200) && (
            <button
              onClick={() => { setSelectedSizes([]); setMaxPrice(200) }}
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </aside>

        {/* GRILLE PRODUITS */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm text-gray-400 tracking-widest uppercase animate-pulse">
                Chargement...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Aucun produit disponible.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {filtered.map(product => (
                <Link
                  to={`/products/${product.slug}`}
                  key={product.id}
                  className="flex flex-col gap-2 group"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                     src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs md:text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category?.name}</p>
                  <div className="flex gap-2 items-center text-sm">
                    <span className="font-medium text-xs md:text-sm">{product.price}€</span>
                    {product.old_price && (
                      <span className="text-red-400 line-through text-xs">{product.old_price}€</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CMen