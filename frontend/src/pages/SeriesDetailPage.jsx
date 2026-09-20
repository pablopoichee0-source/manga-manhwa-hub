import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function SeriesDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [series, setSeries] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [chapterNumber, setChapterNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const { data } = await api.get(`/catalog/${id}`);
        setSeries(data.item);
        setChapterNumber(data.item.chapters[0]?.number || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  useEffect(() => {
    if (!user || !id) {
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data } = await api.get('/favorites');
        setFavorite(data.items.includes(id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [user, id]);

  const handleToggleFavorite = async () => {
    if (!user) {
      return;
    }

    try {
      const { data } = await api.post(`/favorites/${id}`);
      setFavorite(data.isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProgress = async () => {
    if (!user) {
      return;
    }

    try {
      await api.post(`/progress/${id}`, { chapter_number: Number(chapterNumber) });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="loading-shell">Cargando anime...</div>;
  }

  if (!series) {
    return <div className="error-box">Anime no encontrado.</div>;
  }

  return (
    <section className="detail-page">
      <div className="detail-header">
        <img src={series.cover} alt={series.title} className="detail-cover" />
        <div className="detail-copy">
          <p className="eyebrow">{series.type}</p>
          <h1>{series.title}</h1>
          <p>{series.description}</p>
          <div className="meta-row">
            <span>⭐ {series.score.toFixed(1)}</span>
            <span>{series.status}</span>
            <span>{series.chapters.length} episodios</span>
          </div>
          <div className="tags">
            {series.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <div className="detail-actions">
            <button type="button" className="primary-button" onClick={handleToggleFavorite}>
              {favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            </button>
          </div>
        </div>
      </div>

      <div className="reader-panel">
        <div className="reader-controls">
          <label>
            Episodio
            <select value={chapterNumber} onChange={(event) => setChapterNumber(event.target.value)}>
              {series.chapters.map((chapter) => (
                <option key={chapter.number} value={chapter.number}>
                  Episodio {chapter.number}: {chapter.title}
                </option>
              ))}
            </select>
          </label>

          <button type="button" className="secondary-button" onClick={handleSaveProgress}>
            Guardar progreso
          </button>
        </div>

        <div className="chapter-box">
          <h3>
            Episodio {chapterNumber}: {series.chapters.find((chapter) => chapter.number === Number(chapterNumber))?.title}
          </h3>
          <div className="page-list">
            {series.chapters.find((chapter) => chapter.number === Number(chapterNumber))?.pages.map((page, index) => (
              <div className="page-item" key={`${chapterNumber}-${index}`}>
                <span>{page}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
