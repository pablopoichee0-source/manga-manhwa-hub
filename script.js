const series = [
  {
    title: "Solo Leveling",
    type: "action",
    genre: "Action",
    status: "Ongoing",
    rating: 4.9,
    chapters: 179,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Omniscient Reader",
    type: "fantasy",
    genre: "Fantasy",
    status: "Ongoing",
    rating: 4.8,
    chapters: 157,
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "The Beginning After the End",
    type: "fantasy",
    genre: "Fantasy",
    status: "Ongoing",
    rating: 4.7,
    chapters: 205,
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "My Love Mix-Up!",
    type: "romance",
    genre: "Romance",
    status: "Completed",
    rating: 4.6,
    chapters: 42,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Tower of God",
    type: "dark",
    genre: "Dark",
    status: "Ongoing",
    rating: 4.9,
    chapters: 540,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Blue Spring Ride",
    type: "romance",
    genre: "Romance",
    status: "Completed",
    rating: 4.5,
    chapters: 32,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The God of High School",
    type: "action",
    genre: "Action",
    status: "Completed",
    rating: 4.8,
    chapters: 275,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Noblesse",
    type: "school",
    genre: "School",
    status: "Ongoing",
    rating: 4.6,
    chapters: 136,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
  }
];

const trending = [
  { title: "Solo Leveling", rank: 1, readers: "2.3M" },
  { title: "The Beginning After the End", rank: 2, readers: "1.8M" },
  { title: "Omniscient Reader", rank: 3, readers: "1.5M" },
  { title: "Tower of God", rank: 4, readers: "1.3M" },
  { title: "Eleceed", rank: 5, readers: "1.1M" },
  { title: "My Love Mix-Up!", rank: 6, readers: "980K" }
];

const seriesGrid = document.getElementById("seriesGrid");
const trendingList = document.getElementById("trendingList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";

function renderSeries(items) {
  seriesGrid.innerHTML = items
    .map(
      (item) => `
        <article class="series-card">
          <div class="series-cover" style="background-image: linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.44)), url('${item.image}');"></div>
          <div class="series-body">
            <div class="meta-row">
              <span>${item.status}</span>
              <span>•</span>
              <span>${item.chapters} capítulos</span>
            </div>
            <h3>${item.title}</h3>
            <span class="genre-pill">${item.genre}</span>
            <div class="series-footer">
              <span class="rating">★ ${item.rating}</span>
              <button class="read-btn">Leer</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTrending() {
  trendingList.innerHTML = trending
    .map(
      (item) => `
        <div class="trend-item">
          <div class="rank-tag">${item.rank}</div>
          <div class="trend-cover" style="background-image: linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.44)), url('${series[item.rank - 1]?.image || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"}');"></div>
          <div class="trend-copy">
            <h4>${item.title}</h4>
            <p>${item.readers} lectores</p>
          </div>
        </div>
      `
    )
    .join("");
}

function getFilteredSeries() {
  const query = searchInput.value.trim().toLowerCase();

  return series.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.genre.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });
}

function updateSeries() {
  renderSeries(getFilteredSeries());
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateSeries();
  });
});

searchInput.addEventListener("input", updateSeries);

renderSeries(series);
renderTrending();
