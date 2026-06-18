import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function BlogDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://api.rgms-brand.com/api/blog/${slug}/`)
      .then(response => {
        setArticle(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors du chargement de l'article :", error)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Article introuvable</h2>
        <Link to="/blog" className="text-black underline">Retour au blog</Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="text-sm text-gray-500 hover:text-black transition inline-block mb-8">
        ← Retour aux articles
      </Link>
      
      <header className="mb-8">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <h1 className="text-4xl font-extrabold text-black mt-2 mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-xl text-gray-600 italic border-l-4 border-black pl-4 my-6">
          {article.summary}
        </p>
      </header>

      {/* Corps de l'article */}
      <div className="blog-content text-lg leading-relaxed text-gray-800 whitespace-pre-line font-serif">
        {article.content}
      </div>
    </article>
  )
}

export default BlogDetail