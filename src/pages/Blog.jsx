import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://api.rgms-brand.com/api/blog/')
      .then(response => {
        setArticles(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des articles :", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-2 uppercase tracking-tight">Notre Blog</h1>
      <p className="text-gray-600 mb-10">Suivez les coulisses, l'actualité et l'univers RGMS.</p>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Aucun article publié pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <article key={article.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition duration-300">
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-gray-400 mb-2">
                  {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <h2 className="text-xl font-bold text-black mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                  {article.summary}
                </p>
                <Link to={`/blog/${article.slug}`} className="text-black font-semibold text-sm underline hover:text-gray-600 transition inline-block mt-auto">
                  Lire l'article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog