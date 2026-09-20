import { Link } from 'react-router-dom';

const featured = [
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    type: 'TV Series',
    score: 9.1,
    cover: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    description: 'Una familia imposible donde un espía, una asesina y una psíquica ocultan sus identidades en una misión de alto riesgo.'
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    type: 'TV Series',
    score: 9.8,
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    description: 'Humanidad encerrada detrás de muros y una lucha brutal por la libertad y la supervivencia.'
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    type: 'TV Series',
    score: 9.7,
    cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
    description: 'Una odisea intensa de entrenamiento, sacrificio y batallas devastadoras en un mundo de demonios.'
  }
];

export default function CatalogPage() {
  return (
    <section>
      <div className="section-header">
        <h2>Catálogo de anime</h2>
      </div>

      <div className="catalog-grid">
        {featured.map((item) => (
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
