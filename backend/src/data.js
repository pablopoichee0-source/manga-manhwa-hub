const series = [
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    slug: 'spy-x-family',
    type: 'TV Series',
    status: 'Airing',
    score: 9.1,
    cover: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    description: 'Un espía, una asesina y una psíquica forman una familia imposible mientras cada uno oculta su identidad en una operación global.',
    genres: ['Comedy', 'Action', 'Family'],
    chapters: [
      { number: 1, title: 'Operation Strix', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 2, title: 'The Informant', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 3, title: 'The Second Son', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] }
    ]
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    slug: 'attack-on-titan',
    type: 'TV Series',
    status: 'Completed',
    score: 9.8,
    cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    description: 'La humanidad vive detrás de muros mientras gigantes devoran todo aquello que se atreve a salir al exterior.',
    genres: ['Action', 'Drama', 'Fantasy'],
    chapters: [
      { number: 1, title: 'To You, in 2000 Years', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 2, title: 'The Wall', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 3, title: 'The Night of the Closing Ceremony', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] }
    ]
  },
  {
    id: 'fullmetal-alchemist',
    title: 'Fullmetal Alchemist',
    slug: 'fullmetal-alchemist',
    type: 'TV Series',
    status: 'Completed',
    score: 9.4,
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description: 'Dos hermanos buscan la piedra filosofal para recuperar lo que perdieron en una tragedia que cambió su destino.',
    genres: ['Adventure', 'Fantasy', 'Drama'],
    chapters: [
      { number: 1, title: 'The Day He Became a Monster', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 2, title: 'The Highwayman', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 3, title: 'The First Step', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    slug: 'demon-slayer',
    type: 'TV Series',
    status: 'Airing',
    score: 9.7,
    cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
    description: 'Un joven demon slayer recorre la tierra para salvar a su hermana y enfrentarse a criaturas que devoran el futuro.',
    genres: ['Action', 'Fantasy', 'Adventure'],
    chapters: [
      { number: 1, title: 'Cruelty', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 2, title: 'Trainer', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] },
      { number: 3, title: 'The Final Selection', pages: ['Episodio 1', 'Episodio 2', 'Episodio 3', 'Episodio 4'] }
    ]
  }
];

module.exports = { series };
