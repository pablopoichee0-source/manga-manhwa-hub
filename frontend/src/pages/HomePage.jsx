import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const { data } = await api.get('/catalog');
        setItems(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) {
    return <div className="loading-shell">Loading catalog...</div>;
  }

  return (
    <section>
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Curated for readers</p>
          <h1>Read your favorite manga and manhwa in one place.</h1>
        </div>
        <Link to="/register" className="primary-button">Create account</Link>
      </div>

      <div className="section-header">
        <h2>Trending series</h2>
      </div>

      <div className="catalog-grid">
        {items.map((item) => (
          <Link key={item.id} to={`/series/${item.id}`} className="series-card">
            <img src={item.cover} alt={item.title} />
            <div className="card-body">
              <div className="meta-row">
                <span>{item.type}</span>
                <span>⭐ {item.score.toFixed(1)}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="tags">
                {item.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
