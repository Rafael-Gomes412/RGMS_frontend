import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LuUser, LuMapPin, LuPackage, LuLogOut } from 'react-icons/lu'
import api from '../api/axios'

const statusLabels = {
  pending: { label: 'En attente', color: 'text-yellow-500 bg-yellow-50' },
  confirmed: { label: 'Confirmée', color: 'text-blue-500 bg-blue-50' },
  shipped: { label: 'Expédiée', color: 'text-purple-500 bg-purple-50' },
  delivered: { label: 'Livrée', color: 'text-green-500 bg-green-50' },
  cancelled: { label: 'Annulée', color: 'text-red-500 bg-red-50' },
}

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)

  // ÉTATS POUR LE FORMULAIRE D'ADRESSE
  const [isAdding, setIsAdding] = useState(false)
  const [newAddress, setNewAddress] = useState({
    full_name: '',
    street: '',
    city: '',
    postal_code: '',
    country: 'France',
    is_default: false
  })

  // ÉTATS POUR LA MODIFICATION DU COMPTE
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [accountForm, setAccountForm] = useState({
    username: '',
    phone: ''
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrders()
    fetchAddresses()
  }, [user])

  // Synchronise le formulaire du compte quand l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setAccountForm({
        username: user.username || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/')
      setOrders(res.data.results || res.data)
    } catch (err) {
      console.error('Erreur commandes', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAddresses = async () => {
    try {
      const res = await api.get('/users/addresses/')
      setAddresses(res.data.results || res.data)
    } catch (err) {
      console.error('Erreur adresses', err)
    }
  }

  // FONCTION POUR ENVOYER LA NOUVELLE ADRESSE À DJANGO
  const handleAddAddress = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/users/addresses/', newAddress)
      
      // On ajoute la nouvelle adresse reçue de Django à notre liste
      setAddresses([...addresses, res.data])
      
      // On ferme le formulaire et on réinitialise l'état
      setIsAdding(false)
      setNewAddress({
        full_name: '',
        street: '',
        city: '',
        postal_code: '',
        country: 'France',
        is_default: false
      })
    } catch (err) {
      console.error("Erreur lors de la création de l'adresse :", err.response?.data || err.message)
    }
  }

// FONCTION POUR METTRE À JOUR LES INFOS DU COMPTE SUR DJANGO
  const handleUpdateAccount = async (e) => {
    e.preventDefault()
    try {
      // Envoi des modifications à Django
      const res = await api.patch('/users/profile/', accountForm)
      
      setIsEditingAccount(false)
      alert('Informations mises à jour avec succès !')

      // OPTIONS SELON TON AUTHCONTEXT :
      // Option A : Si ton AuthContext te donne une fonction pour rafraîchir ou muter l'user directement :
      // ex: updateUser(res.data) 
      
      // Option B (Alternative propre sans rechargement) : 
      // Tu peux simplement modifier manuellement l'objet user s'il est modifiable :
      if (user) {
        user.username = res.data.username
        user.phone = res.data.phone
      }

    } catch (err) {
      console.error("Erreur lors de la mise à jour du compte :", err.response?.data || err.message)
      alert("Une erreur est survenue lors de la mise à jour.")
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'orders', label: 'Mes commandes', icon: <LuPackage size={16} /> },
    { id: 'addresses', label: 'Mes adresses', icon: <LuMapPin size={16} /> },
    { id: 'account', label: 'Mon compte', icon: <LuUser size={16} /> },
  ]

  return (
    <div className="w-full min-h-screen px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-1">Espace</p>
        <h1 className="text-3xl font-bold uppercase tracking-widest">
          {user?.username || 'Mon compte'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* SIDEBAR */}
        <aside className="lg:w-56 shrink-0 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setIsAdding(false) // Ferme le formulaire d'adresse si on change d'onglet
                setIsEditingAccount(false) // Réinitialise le mode édition du compte
              }}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition text-left ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-50 transition mt-4"
          >
            <LuLogOut size={16} />
            Déconnexion
          </button>
        </aside>

        {/* CONTENU */}
        <div className="flex-1">

          {/* Onglet Commandes */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm uppercase tracking-widest font-bold">Mes commandes</h2>
              {loading ? (
                <p className="text-sm text-gray-400 animate-pulse">Chargement...</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-gray-400">Aucune commande pour l'instant.</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="border border-gray-100 p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">Commande #{order.id}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusLabels[order.status]?.color}`}>
                        {statusLabels[order.status]?.label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.quantity}x {item.variant?.product?.name} — {item.variant?.size?.name}
                          </span>
                          <span>{item.unit_price}€</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                      <span className="text-sm font-bold">{order.total_price}€</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Onglet Adresses */}
          {activeTab === 'addresses' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm uppercase tracking-widest font-bold">Mes adresses</h2>
              
              {isAdding ? (
                /* FORMULAIRE D'AJOUT D'ADRESSE */
                <form onSubmit={handleAddAddress} className="flex flex-col gap-4 max-w-md border border-gray-200 p-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Nom complet du destinataire</label>
                    <input 
                      type="text" required placeholder="Ex: Jean Dupont"
                      className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black"
                      value={newAddress.full_name}
                      onChange={e => setNewAddress({...newAddress, full_name: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Adresse (Rue, voie...)</label>
                    <input 
                      type="text" required placeholder="Ex: 12 Rue de la Paix"
                      className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black"
                      value={newAddress.street}
                      onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1 col-span-1">
                      <label className="text-xs uppercase tracking-widest text-gray-400">Code Postal</label>
                      <input 
                        type="text" required placeholder="75001"
                        className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black"
                        value={newAddress.postal_code}
                        onChange={e => setNewAddress({...newAddress, postal_code: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                      <label className="text-xs uppercase tracking-widest text-gray-400">Ville</label>
                      <input 
                        type="text" required placeholder="Paris"
                        className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black"
                        value={newAddress.city}
                        onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-gray-400">Pays</label>
                    <input 
                      type="text" required
                      className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black"
                      value={newAddress.country}
                      onChange={e => setNewAddress({...newAddress, country: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center gap-2 my-2">
                    <input 
                      type="checkbox" id="is_default"
                      className="accent-black"
                      checked={newAddress.is_default}
                      onChange={e => setNewAddress({...newAddress, is_default: e.target.checked})}
                    />
                    <label htmlFor="is_default" className="text-sm text-gray-600 select-none">
                      Définir comme adresse par défaut
                    </label>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <button type="submit" className="bg-black text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-gray-800 transition">
                      Enregistrer
                    </button>
                    <button type="button" onClick={() => setIsAdding(false)} className="border border-gray-200 px-6 py-2 text-sm uppercase tracking-widest hover:bg-gray-50 transition">
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                /* LISTE DES ADRESSES */
                <>
                  {addresses.length === 0 ? (
                    <div className="border border-dashed border-gray-200 p-6 text-center">
                      <p className="text-sm text-gray-400 mb-4">Aucune adresse enregistrée</p>
                      <button 
                        onClick={() => setIsAdding(true)}
                        className="border border-black px-6 py-2 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition">
                        Ajouter une adresse
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(address => (
                          <div key={address.id} className="border border-gray-100 p-6 relative flex flex-col justify-between">
                            <div>
                              <p className="font-medium">{address.full_name}</p>
                              <p className="text-sm text-gray-400 mt-2">{address.street}</p>
                              <p className="text-sm text-gray-400">{address.postal_code} {address.city}</p>
                              <p className="text-sm text-gray-400">{address.country}</p>
                            </div>
                            {address.is_default && (
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded mt-4 self-start font-medium">
                                Adresse par défaut
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => setIsAdding(true)}
                        className="border border-black px-6 py-2 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition self-start mt-4">
                        Ajouter une adresse
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Onglet Compte */}
          {activeTab === 'account' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-sm uppercase tracking-widest font-bold">Mon compte</h2>
              
              <form onSubmit={handleUpdateAccount} className="flex flex-col gap-4 max-w-md">
                
                {/* Champ Email (Lecture seule car bloqué côté Django) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Email (Non modifiable)
                  </label>
                  <div className="border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-400 select-none">
                    {user?.email}
                  </div>
                </div>

                {/* Champ Nom d'utilisateur */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Nom d'utilisateur
                  </label>
                  {isEditingAccount ? (
                    <input
                      type="text"
                      required
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                      value={accountForm.username}
                      onChange={e => setAccountForm({ ...accountForm, username: e.target.value })}
                    />
                  ) : (
                    <div className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {user?.username}
                    </div>
                  )}
                </div>

                {/* Champ Téléphone */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Téléphone
                  </label>
                  {isEditingAccount ? (
                    <input
                      type="text"
                      placeholder="Ex: 0601020304"
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                      value={accountForm.phone}
                      onChange={e => setAccountForm({ ...accountForm, phone: e.target.value })}
                    />
                  ) : (
                    <div className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                      {user?.phone || 'Non renseigné'}
                    </div>
                  )}
                </div>

                {/* Boutons de contrôle */}
                {isEditingAccount ? (
                  <div className="flex gap-4 mt-2">
                    <button 
                      type="submit" 
                      className="bg-black text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition"
                    >
                      Sauvegarder
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsEditingAccount(false)
                        // Annulation : réinitialise le formulaire avec les valeurs actuelles du contexte
                        setAccountForm({ username: user?.username || '', phone: user?.phone || '' })
                      }} 
                      className="border border-gray-200 px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-50 transition"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setIsEditingAccount(true)}
                    className="border border-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition mt-2"
                  >
                    Modifier mes informations
                  </button>
                )}

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile