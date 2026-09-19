const fs = require('fs');
const path = require('path');

const series = [
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    slug: 'solo-leveling',
    type: 'Manhwa',
    status: 'Ongoing',
    score: 9.7,
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80',
    description: 'A hunter turned into the strongest power in a dungeon world. Every chapter is a step toward unbelievable growth.',
    genres: ['Action', 'Fantasy', 'System'],
    chapters: [
      { number: 1, title: 'The Gate', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 2, title: 'The Awakening', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 3, title: 'Shadow', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 4, title: 'The Hunt', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] }
    ]
  },
  {
    id: 'beginning-after-the-end',
    title: 'The Beginning After the End',
    slug: 'beginning-after-the-end',
    type: 'Webtoon',
    status: 'Ongoing',
    score: 9.5,
    cover: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=700&q=80',
    description: 'A former king is reborn with a second chance, and he now has to reclaim his place in a world full of magic and danger.',
    genres: ['Fantasy', 'Adventure', 'Reincarnation'],
    chapters: [
      { number: 1, title: 'Second Life', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 2, title: 'The Awakening', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 3, title: 'The Sword', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] }
    ]
  },
  {
    id: 'wind-breaker',
    title: 'Wind Breaker',
    slug: 'wind-breaker',
    type: 'Manhwa',
    status: 'Ongoing',
    score: 9.2,
    cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=700&q=80',
    description: 'A young rider discovers a brutally powerful world of speed, adrenaline, and competition.',
    genres: ['Sports', 'Action', 'Drama'],
    chapters: [
      { number: 1, title: 'Starting Line', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 2, title: 'Night Ride', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 3, title: 'The Pack', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] }
    ]
  },
  {
    id: 'fated-villain',
    title: 'I Am the Fated Villain',
    slug: 'fated-villain',
    type: 'Manhua',
    status: 'Completed',
    score: 9.0,
    cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=700&q=80',
    description: 'A villain who sees through the system tries to rewrite destiny and choose his own path.',
    genres: ['Action', 'Fantasy', 'Drama'],
    chapters: [
      { number: 1, title: 'The Last Mission', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 2, title: 'The Rewrite', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] },
      { number: 3, title: 'System Break', pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'] }
    ]
  }
];

module.exports = { series };
