const news = [
  {
    title: 'Las mejores series de primavera llegadas a Netflix',
    category: 'Estrenos',
    summary: 'Un repaso rápido de los títulos más destacados de la temporada actual.',
    date: '12 de marzo de 2026'
  },
  {
    title: 'Qué anime mirar si te gustó Attack on Titan',
    category: 'Recomendaciones',
    summary: 'Siete opciones con tensión, drama y momentos intensos para seguir con la misma energía.',
    date: '9 de marzo de 2026'
  },
  {
    title: 'Animes con diseño visual espectacular en 2026',
    category: 'Estilo',
    summary: 'Producciones que destacan por su dirección artística, iluminación y composición.',
    date: '2 de marzo de 2026'
  }
];

export default function NewsPage() {
  return (
    <section>
      <div className="section-header">
        <h2>Noticias y estrenos</h2>
      </div>
      <div className="news-grid">
        {news.map((item) => (
          <article key={item.title} className="news-card">
            <span className="news-tag">{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <small>{item.date}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
