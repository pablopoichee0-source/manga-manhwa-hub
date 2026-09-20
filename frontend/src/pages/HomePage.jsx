import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Últimos estrenos',
    summary: 'Busca series nuevas y notas de lanzamiento para conocer qué merece la pena ver esta temporada.',
    link: '/anime'
  },
  {
    title: 'Top anime',
    summary: 'Listado con las mejores valoraciones del momento para ayudarte a decidir qué ver.',
    link: '/top-anime'
  },
  {
    title: 'Noticias',
    summary: 'Actualizaciones de la industria, nuevas temporadas, anuncios y artículos relevantes.',
    link: '/noticias'
  }
];

export default function HomePage() {
  return (
    <section>
      <div className="hero-panel hero-panel-alt">
        <div>
          <p className="eyebrow">Anime legal</p>
          <h1>Tu guía para explorar anime, estrenos y reseñas de calidad.</h1>
        </div>
        <Link to="/anime" className="primary-button">Explorar catálogo</Link>
      </div>

      <div className="info-grid">
        {sections.map((item) => (
          <Link key={item.title} to={item.link} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </Link>
        ))}
      </div>

      <div className="section-header">
        <h2>Anime destacado</h2>
        <Link to="/anime" className="mini-link">Ver todo</Link>
      </div>

      <div className="catalog-grid">
        {[
          {
            id: 'spy-x-family',
            title: 'Spy x Family',
            type: 'TV Series',
            score: 9.1,
            cover: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
            description: 'Un espía, una asesina y una psíquica forman la familia más extraña del mundo del anime.'
          },
          {
            id: 'attack-on-titan',
            title: 'Attack on Titan',
            type: 'TV Series',
            score: 9.8,
            cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
            description: 'Drama, tensión y una batalla épica contra monstruos gigantes que redefine la humanidad.'
          },
          {
            id: 'demon-slayer',
            title: 'Demon Slayer',
            type: 'TV Series',
            score: 9.7,
            cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
            description: 'Un viaje de obsesión, entrenamiento y sacrificio para derrotar a demonios despiadados.'
          }
        ].map((item) => (
          <Link key={item.id} to={`/series/${item.id}`} className="series-card">
            <img src={item.cover} alt={item.title} />
            <div className="card-body">
              <div className="meta-row">
                <span>{item.type}</span>
                <span>⭐ {item.score.toFixed(1)}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
