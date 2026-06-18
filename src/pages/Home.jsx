import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroFemme from '../assets/hero-femme.jpg'
import heroHomme from '../assets/hero-homme.jpg'
import api from '../api/axios'

function Home() {
  const [womenProducts, setWomenProducts] = useState([])
  const [menProducts, setMenProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [womenRes, menRes] = await Promise.all([
          api.get('/products/?category=femme&ordering=-created_at'),
          api.get('/products/?category=homme&ordering=-created_at'),
        ])
        const womenData = womenRes.data.results || womenRes.data
        const menData = menRes.data.results || menRes.data
        setWomenProducts(womenData.slice(0, 4))
        setMenProducts(menData.slice(0, 4))
      } catch (err) {
        console.error('Erreur chargement produits', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="w-full">

      {/* HERO FEMME */}
      <section className="relative w-full h-screen -mt-20">
        <img
          src={heroFemme}
          alt="Collection Femme"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-80">
            Rise · Grind · Move · Succeed
          </p>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6 leading-tight">
            L'Esprit du Loup<br />La Liberté du Style
          </h1>
          <Link
            to="/femme"
            className="border border-white text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Découvrir
          </Link>
        </div>
      </section>

      {/* SECTION FEMME */}
      <section className="w-full px-8 py-5">
        <p className="text-left text-xl font-bold uppercase tracking-widest mb-5">
          Nouveautés
        </p>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <p className="text-sm text-gray-400 animate-pulse tracking-widest uppercase">
              Chargement...
            </p>
          </div>
        ) : womenProducts.length === 0 ? (
          <div className="flex justify-center h-32 items-center">
            <p className="text-sm text-gray-400">Aucun produit disponible.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {womenProducts.map(product => (
              <Link
                to={`/products/${product.slug}`}
                key={product.id}
                className="flex flex-col gap-2 group"
              >
                <div className="bg-gray-100 aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-gray-400">{product.category?.name}</p>
                
                <div className="flex gap-2 items-center text-sm">
                  <span className="font-medium">{product.price}€</span>
                  {product.old_price && (
                    <span className="text-red-400 line-through text-xs">{product.old_price}€</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/femme"
            className="border border-black text-black px-10 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Voir tout
          </Link>
        </div>
      </section>

      {/* HERO HOMME */}
      <section className="relative w-full h-screen">
        <img
          src={heroHomme}
          alt="Collection Homme"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-80">
            Rise · Grind · Move · Succeed
          </p>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6 leading-tight">
            L'Esprit du Loup<br />La Liberté du Style
          </h1>
          <Link
            to="/homme"
            className="border border-white text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Découvrir
          </Link>
        </div>
      </section>

      {/* SECTION HOMME */}
      <section className="w-full px-8 py-5">
        <p className="text-left text-xl font-bold uppercase tracking-widest mb-10">
          Nouveautés
        </p>

        {!loading && menProducts.length === 0 ? (
          <div className="flex justify-center h-32 items-center">
            <p className="text-sm text-gray-400">Aucun produit disponible.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menProducts.map(product => (
              <Link
                to={`/products/${product.slug}`}
                key={product.id}
                className="flex flex-col gap-2 group"
              >
                <div className="bg-gray-100 aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-gray-400">{product.category?.name}</p>
                 <div className="flex gap-2 items-center text-sm">
                  <span className="font-medium">{product.price}€</span>
                  {product.old_price && (
                    <span className="text-red-400 line-through text-xs">{product.old_price}€</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/homme"
            className="border border-black text-black px-10 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Voir tout
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home