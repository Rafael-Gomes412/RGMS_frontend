import { useState } from 'react'

const faqs = [
  {
    category: 'Commandes',
    questions: [
      {
        q: 'Comment passer une commande ?',
        a: 'Ajoutez vos articles au panier, puis cliquez sur "Commander". Vous serez guidé pour renseigner votre adresse de livraison et effectuer le paiement de manière sécurisée.'
      },
      {
        q: 'Puis-je modifier ou annuler ma commande ?',
        a: 'Vous pouvez annuler une commande tant qu\'elle est en statut "En attente" depuis votre espace profil. Une fois expédiée, l\'annulation n\'est plus possible.'
      },
      {
        q: 'Comment suivre ma commande ?',
        a: 'Rendez-vous dans votre espace profil → Mes commandes. Vous y trouverez le statut en temps réel de chaque commande.'
      },
    ]
  },
  {
    category: 'Livraison',
    questions: [
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'La livraison standard prend entre 3 et 5 jours ouvrés en France métropolitaine. Les commandes sont expédiées sous 24h après confirmation du paiement.'
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: 'Oui ! La livraison est offerte pour toute commande supérieure à 60€. En dessous, des frais de 4,99€ s\'appliquent.'
      },
      {
        q: 'Livrez-vous à l\'international ?',
        a: 'Pour l\'instant, nous livrons uniquement en France métropolitaine. La livraison internationale sera disponible prochainement.'
      },
    ]
  },
  {
    category: 'Retours & Remboursements',
    questions: [
      {
        q: 'Comment retourner un article ?',
        a: 'Vous disposez de 30 jours après réception pour retourner un article. Contactez-nous via la page Contact pour initier un retour. Les frais de retour sont à notre charge.'
      },
      {
        q: 'Quand serai-je remboursé ?',
        a: 'Le remboursement est effectué sous 5 à 10 jours ouvrés après réception de votre retour, sur le moyen de paiement utilisé lors de la commande.'
      },
      {
        q: 'Les articles soldés sont-ils retournables ?',
        a: 'Oui, les articles soldés sont soumis aux mêmes conditions de retour que les articles à prix plein.'
      },
    ]
  },
  {
    category: 'Tailles & Produits',
    questions: [
      {
        q: 'Comment choisir ma taille ?',
        a: 'Nos vêtements suivent les tailles standards européennes (XS, S, M, L, XL, XXL). En cas de doute, nous recommandons de prendre une taille au-dessus pour un style oversize.'
      },
      {
        q: 'Les couleurs sont-elles fidèles aux photos ?',
        a: 'Nous faisons de notre mieux pour que les photos soient les plus fidèles possible. Cependant, les couleurs peuvent légèrement varier selon la calibration de votre écran.'
      },
    ]
  },
  {
    category: 'Paiement',
    questions: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), Apple Pay et Google Pay via notre partenaire Stripe.'
      },
      {
        q: 'Mes données bancaires sont-elles sécurisées ?',
        a: 'Absolument. Nous utilisons Stripe, leader mondial du paiement en ligne. Vos données bancaires ne transitent jamais sur nos serveurs.'
      },
    ]
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="text-sm font-medium pr-8">{question}</span>
        <span className="text-xl shrink-0 transition-transform duration-300" style={{
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)'
        }}>
          +
        </span>
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-5">
          {answer}
        </p>
      )}
    </div>
  )
}

function FAQ() {
  return (
    <div className="w-full min-h-screen">

      {/* Header */}
      <div className="w-full px-8 py-16 border-b border-gray-100 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
          Aide & Support
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">
          FAQ
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Vous avez une question ? Consultez nos réponses aux questions les plus fréquentes. Si vous ne trouvez pas votre réponse, contactez-nous !
        </p>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-12">
        {faqs.map(section => (
          <div key={section.category}>
            <h2 className="text-xs uppercase tracking-widest font-bold mb-6 text-gray-400">
              {section.category}
            </h2>
            <div>
              {section.questions.map(item => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Contact */}
      <div className="bg-gray-50 px-8 py-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
          Toujours des questions ?
        </p>
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">
          Contactez-nous
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Notre équipe répond sous 24h.
        </p>
        <a
          href="/contact"
          className="border border-black px-10 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
        >
          Nous contacter
        </a>
      </div>

    </div>
  )
}

export default FAQ