import { Link } from 'react-router-dom'
import { LuInstagram } from 'react-icons/lu'
import { RiTwitterXLine } from 'react-icons/ri'
import logo from '../assets/logo.svg'

function Footer() {
  return (
    <footer className="bg-black text-white -mt-5">
      <div className="w-full px-4 py-16">

        {/* Haut du footer */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Logo + description */}
          <div className="flex flex-col gap-4 max-w-xs">
            <img src={logo} alt="RGMS" className="h-10 w-auto invert" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Vêtements pensés pour ceux qui avancent. Qualité, style et authenticité.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/rgms_brand" target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white transition">
                <LuInstagram size={22} />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white transition">
                <RiTwitterXLine size={22} />
              </a>
            </div>
          </div>

          {/* Colonne : Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2">
              Collections
            </h3>
            <Link to="/homme" className="text-gray-400 hover:text-white text-sm transition">
              Homme
            </Link>
            <Link to="/femme" className="text-gray-400 hover:text-white text-sm transition">
              Femme
            </Link>
            <Link to="/accessoires" className="text-gray-400 hover:text-white text-sm transition">
              Accessoires
            </Link>
          </div>

          {/* Colonne : À propos */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2">
              À propos
            </h3>
            <Link to="/about" className="text-gray-400 hover:text-white text-sm transition">
              About us
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition">
              Nous joindre
            </Link>
            <Link to="/community" className="text-gray-400 hover:text-white text-sm transition">
              Notre communauté
            </Link>
          </div>

          {/* Colonne : Aide */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-2">
              Aide
            </h3>
            <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition">
              FAQ
            </Link>
            <Link to="/mentions" className="text-gray-400 hover:text-white text-sm transition">
              Mentions légales
            </Link>
          </div>

        </div>

        {/* Bas du footer */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} RGMS. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs">
            Made with ❤️ by RGMS Team
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer