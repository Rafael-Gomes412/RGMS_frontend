function Mentions() {
  return (
    <div className="w-full min-h-screen">

      {/* Header */}
      <div className="w-full px-8 py-16 border-b border-gray-100 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
          Informations légales
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-widest">
          Mentions légales
        </h1>
      </div>

      {/* Contenu */}
      <div className="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-12">

        {/* Éditeur */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            01 — Éditeur du site
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600 leading-relaxed">
            <p><span className="font-medium text-black">Raison sociale :</span> RGMS</p>
            <p><span className="font-medium text-black">Forme juridique :</span> Auto-entrepreneur</p>
            <p><span className="font-medium text-black">Adresse :</span> France</p>
            <p><span className="font-medium text-black">Email :</span> contact@rgms.fr</p>
            <p><span className="font-medium text-black">Directeur de publication :</span> Rafael Gomes</p>
          </div>
        </section>

        {/* Hébergement */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            02 — Hébergement
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600 leading-relaxed">
            <p><span className="font-medium text-black">Hébergeur :</span> À compléter après déploiement</p>
            <p><span className="font-medium text-black">Adresse :</span> À compléter après déploiement</p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            03 — Propriété intellectuelle
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L'ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite de RGMS.
          </p>
        </section>

        {/* Données personnelles */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            04 — Données personnelles (RGPD)
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à <span className="text-black">contact@rgms.fr</span>.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les données collectées (nom, email, adresse) sont utilisées uniquement dans le cadre du traitement de vos commandes et ne sont jamais revendues à des tiers.
          </p>
        </section>

        {/* Cookies */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            05 — Cookies
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ce site utilise des cookies fonctionnels nécessaires à son bon fonctionnement (authentification, panier). Aucun cookie publicitaire ou de tracking n'est utilisé sans votre consentement.
          </p>
        </section>

        {/* Paiement */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            06 — Paiement sécurisé
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les paiements sont traités par <span className="font-medium text-black">Stripe</span>, solution certifiée PCI-DSS. RGMS ne stocke aucune donnée bancaire sur ses serveurs.
          </p>
        </section>

        {/* Droit applicable */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">
            07 — Droit applicable
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

        {/* Dernière mise à jour */}
        <p className="text-xs text-gray-400 border-t border-gray-100 pt-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

      </div>
    </div>
  )
}

export default Mentions