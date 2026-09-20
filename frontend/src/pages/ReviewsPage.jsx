const reviews = [
  {
    title: 'Spy x Family',
    score: '9.1',
    text: 'Una mezcla brillante de humor, acción y ternura que funciona increíblemente bien en cada episodio.'
  },
  {
    title: 'Demon Slayer',
    score: '9.7',
    text: 'Una experiencia visual intensa y muy emocionante, con una mezcla de acción elegante y emoción constante.'
  },
  {
    title: 'Fullmetal Alchemist',
    score: '9.4',
    text: 'Un clásico que conserva su fuerza narrativa, su impacto emocional y su enorme ambición temática.'
  }
];

export default function ReviewsPage() {
  return (
    <section>
      <div className="section-header">
        <h2>Reseñas destacadas</h2>
      </div>
      <div className="review-grid">
        {reviews.map((item) => (
          <article key={item.title} className="review-card">
            <div className="review-head">
              <h3>{item.title}</h3>
              <span>{item.score}</span>
            </div>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
