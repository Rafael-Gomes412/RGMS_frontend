import { useState } from 'react'
import { LuInstagram } from 'react-icons/lu'
function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulation envoi pour l'instant
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="w-full min-h-screen">

      {/* Header */}
      <div className="w-full px-8 py-16 border-b border-gray-100 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
          On est là pour vous
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">
          Nous contacter
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Une question, une suggestion ou un problème ? Notre équipe vous répond sous 24h.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 flex flex-col lg:flex-row gap-16">

        {/* GAUCHE — Infos contact */}
        <div className="lg:w-1/3 flex flex-col gap-8">

          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold mb-6">
              Nos coordonnées
            </h2>
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: '📧',
                  label: 'Email',
                  value: 'contact@rgms.fr',
                  link: 'mailto:contact@rgms.fr'
                },
                {
                    icon: <LuInstagram size={22} />, 
                    value: '@rgms_brand',  // ←
                    link: 'https://www.instagram.com/rgms_brand'  
                  },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {item.icon} {item.label}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm hover:text-gray-500 transition"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* DROITE — Formulaire */}
        <div className="lg:w-2/3">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-8">
            Envoyer un message
          </h2>

          {sent ? (
            <div className="border border-green-200 bg-green-50 p-8 text-center">
              <p className="text-2xl mb-4">✅</p>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2">
                Message envoyé !
              </h3>
              <p className="text-sm text-gray-500">
                Merci pour votre message. Nous vous répondrons sous 24h.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                className="mt-6 border border-black px-6 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
              >
                Nouveau message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rafael Gomes"
                    required
                    className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ton@email.com"
                    required
                    className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-gray-400">
                  Sujet
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition bg-white"
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="commande">Ma commande</option>
                  <option value="retour">Retour & remboursement</option>
                  <option value="produit">Question produit</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-widest text-gray-400">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande..."
                  required
                  rows={6}
                  className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition disabled:opacity-50 mt-2"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default Contact