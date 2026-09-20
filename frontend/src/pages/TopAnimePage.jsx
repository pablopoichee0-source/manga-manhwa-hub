import { Link } from 'react-router-dom';

const topAnime = [
  { id: 'attack-on-titan', title: 'Attack on Titan', score: 9.8 },
  { id: 'demon-slayer', title: 'Demon Slayer', score: 9.7 },
  { id: 'spy-x-family', title: 'Spy x Family', score: 9.1 },
  { id: 'fullmetal-alchemist', title: 'Fullmetal Alchemist', score: 9.4 }
];

export default function TopAnimePage() {
  return (
    <section>
      <div className="section-header">
        <h2>Top anime</h2>
      </div>

      <div className="ranking-list">
        {topAnime.map((item, index) => (
          <Link key={item.id} to={`/series/${item.id}`} className="ranking-item">
            <span className="ranking-number">#{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>Valoración: {item.score.toFixed(1)} / 10</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
