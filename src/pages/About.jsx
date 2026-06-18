import { Link } from 'react-router-dom'
import heroFemme from '../assets/hero-femme.jpg'
import heroHomme from '../assets/hero-homme.jpg'

function About() {
  return (
    <div className="w-full min-h-screen">

      {/* HERO */}
      <section className="relative w-full h-[60vh]">
        <img
          src={heroFemme}
          alt="RGMS"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-80">
            Notre histoire
          </p>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest">
            About Us
          </h1>
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section className="max-w-3xl mx-auto px-8 py-20 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
          Qui sommes nous
        </p>
        <h2 className="text-3xl font-bold uppercase tracking-widest mb-8">
          L'Esprit du Loup
        </h2>
        <p className="text-gray-500 leading-relaxed mb-6">
          RGMS est née d'une passion pour le style et la liberté. Nous croyons que la mode est bien plus qu'un vêtement — c'est une façon d'exprimer qui vous êtes, de montrer votre force et votre ambition.
        </p>
        <p className="text-gray-500 leading-relaxed mb-6">
          Chaque pièce de notre collection est pensée pour les personnes qui avancent, qui ne s'arrêtent pas, qui repoussent leurs limites. Du sportswear au casual chic, RGMS habille ceux qui ont faim de réussite.
        </p>
        <p className="text-gray-500 leading-relaxed">
          Notre mantra : <span className="font-semibold text-black">Rise. Grind. Move. Succeed.</span>
        </p>
      </section>

      {/* NOS VALEURS */}
      <section className="bg-gray-50 px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 text-center mb-4">
            Ce qui nous définit
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-widest text-center mb-16">
            Nos valeurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: '🐺',
                title: 'Authenticité',
                text: 'Nous ne suivons pas les tendances, nous les créons. Chaque collection reflète notre vision unique du style.'
              },
              {
                icon: '⚡',
                title: 'Performance',
                text: 'Des matières premium sélectionnées pour leur qualité, leur confort et leur durabilité. Fait pour durer.'
              },
              {
                icon: '🌍',
                title: 'Responsabilité',
                text: 'Nous nous engageons à produire de manière éthique et à réduire notre impact environnemental à chaque collection.'
              },
            ].map(value => (
              <div key={value.title} className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">{value.icon}</span>
                <h3 className="text-sm font-bold uppercase tracking-widest">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE + TEXTE */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">

          <div className="md:w-1/2">
            <img
              src={heroHomme}
              alt="RGMS Homme"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="md:w-1/2 flex flex-col gap-6">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400">
              Notre mission
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-widest leading-tight">
              Habiller ceux qui n'abandonnent jamais
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Chez RGMS, nous croyons que chaque personne mérite de se sentir puissante et confiante dans ce qu'elle porte. Nos vêtements sont conçus pour accompagner votre quotidien, de l'entraînement matinal aux sorties du soir.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Rejoignez une communauté de personnes qui partagent les mêmes valeurs : l'ambition, la persévérance et le style.
            </p>
            <Link
              to="/"
              className="border border-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition w-fit"
            >
              Découvrir la collection
            </Link>
          </div>

        </div>
      </section>

      {/* CTA COMMUNAUTÉ */}
      <section className="bg-black text-white px-8 py-20 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
          Rejoins nous
        </p>
        <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">
          La communauté RGMS
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Des milliers de personnes portent déjà RGMS. Rejoins le mouvement et fais partie d'une communauté qui avance.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-black px-10 py-3 text-sm uppercase tracking-widest hover:bg-gray-200 transition"
          >
            Créer un compte
          </Link>
          <Link
            to="/contact"
            className="border border-white text-white px-10 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            Nous contacter
          </Link>
        </div>
      </section>

    </div>
  )
}

export default About