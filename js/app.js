const STORAGE_KEY = "lol-skin-tinder-votes";
const HISTORY_KEY = "lol-skin-tinder-history";

const CHROMA_MARKERS = [
  "obsidian", "pearl", "ruby", "rose quartz", "emerald", "amethyst",
  "sapphire", "tanzanite", "catseye", "citrine", "aquamarine",
  "meteorite", "sandstone", "rainbow", "turquoise", "topaz",
  "reignited", "amber", "night blossom", "paragon", "chroma"
];

const SPECIAL_VARIANT_MARKERS = [
  "merc",
  "the baddest",
  "anniversary",
  "versary",
  "mythic chroma",
  "event chroma",
  "championship chroma",
  "paragon"
];

const PARENTHESIS_VARIANT_NAME_RX = /\([^)]*\)/;

const CHAMPION_GENDERS = {
  Aatrox: "male", Ahri: "female", Akali: "female", Akshan: "male",
  Alistar: "male", Ambessa: "female", Amumu: "male", Anivia: "female",
  Annie: "female", Aphelios: "male", Ashe: "female", AurelionSol: "male",
  Aurora: "female", Azir: "male", Bard: "male", Belveth: "female",
  Blitzcrank: "other", Brand: "male", Braum: "male", Briar: "female",
  Caitlyn: "female", Camille: "female", Cassiopeia: "female", Chogath: "other",
  Corki: "male", Darius: "male", Diana: "female", DrMundo: "male",
  Draven: "male", Ekko: "male", Elise: "female", Evelynn: "female",
  Ezreal: "male", Fiddlesticks: "other", Fiora: "female", Fizz: "male",
  Galio: "male", Gangplank: "male", Garen: "male", Gnar: "male",
  Gragas: "male", Graves: "male", Gwen: "female", Hecarim: "male",
  Heimerdinger: "male", Hwei: "male", Illaoi: "female", Irelia: "female",
  Ivern: "male", Janna: "female", JarvanIV: "male", Jax: "male",
  Jayce: "male", Jhin: "male", Jinx: "female", Kaisa: "female",
  Kalista: "female", Karma: "female", Karthus: "male", Kassadin: "male",
  Katarina: "female", Kayle: "female", Kayn: "male", Kennen: "male",
  Khazix: "male", Kindred: "other", Kled: "male", KogMaw: "other",
  Ksante: "male", Leblanc: "female", LeeSin: "male", Leona: "female",
  Lillia: "female", Lissandra: "female", Lucian: "male", Lulu: "female",
  Lux: "female", Malphite: "male", Malzahar: "male", Maokai: "male",
  MasterYi: "male", Mel: "female", Milio: "male", MissFortune: "female",
  Mordekaiser: "male", Morgana: "female", Naafiri: "female", Nami: "female",
  Nasus: "male", Nautilus: "male", Neeko: "female", Nidalee: "female",
  Nilah: "female", Nocturne: "male", Nunu: "male", Olaf: "male",
  Orianna: "female", Ornn: "male", Pantheon: "male", Poppy: "female",
  Pyke: "male", Qiyana: "female", Quinn: "female", Rakan: "male",
  Rammus: "male", RekSai: "female", Rell: "female", Renata: "female",
  Renekton: "male", Rengar: "male", Riven: "female", Rumble: "male",
  Ryze: "male", Samira: "female", Sejuani: "female", Senna: "female",
  Seraphine: "female", Sett: "male", Shaco: "male", Shen: "male",
  Shyvana: "female", Singed: "male", Sion: "male", Sivir: "female",
  Skarner: "male", Smolder: "male", Sona: "female", Soraka: "female",
  Swain: "male", Sylas: "male", Syndra: "female", TahmKench: "male",
  Taliyah: "female", Talon: "male", Taric: "male", Teemo: "male",
  Thresh: "male", Tristana: "female", Trundle: "male", Tryndamere: "male",
  TwistedFate: "male", Twitch: "male", Udyr: "male", Urgot: "male",
  Varus: "male", Vayne: "female", Veigar: "male", Velkoz: "other",
  Vex: "female", Vi: "female", Viego: "male", Viktor: "male",
  Vladimir: "male", Volibear: "male", Warwick: "male", Xayah: "female",
  Xerath: "male", XinZhao: "male", Yasuo: "male", Yone: "male",
  Yorick: "male", Yuumi: "female", Zac: "male", Zed: "male",
  Zeri: "female", Ziggs: "male", Zilean: "male", Zoe: "female", Zyra: "female"
};

const state = {
  sourceSkins: [],
  filteredSkins: [],
  votes: loadJson(STORAGE_KEY, {}),
  history: loadJson(HISTORY_KEY, []),
  currentView: "deck",
  drag: null,
};

const els = {
  cardStack: document.getElementById("cardStack"),
  deckTitle: document.getElementById("deckTitle"),
  searchInput: document.getElementById("searchInput"),
  championFilter: document.getElementById("championFilter"),
  sortMode: document.getElementById("sortMode"),
  skipBaseSkins: document.getElementById("skipBaseSkins"),
  onlyUnrated: document.getElementById("onlyUnrated"),
  onlyFemale: document.getElementById("onlyFemale"),
  onlyMale: document.getElementById("onlyMale"),
  showChromas: document.getElementById("showChromas"),
  mainSkinsOnly: document.getElementById("mainSkinsOnly"),
  dislikeBtn: document.getElementById("dislikeBtn"),
  likeBtn: document.getElementById("likeBtn"),
  skipBtn: document.getElementById("skipBtn"),
  undoBtn: document.getElementById("undoBtn"),
  resetBtn: document.getElementById("resetBtn"),
  viewDeckBtn: document.getElementById("viewDeckBtn"),
  viewResultsBtn: document.getElementById("viewResultsBtn"),
  showResultsBtn: document.getElementById("showResultsBtn"),
  deckView: document.getElementById("deckView"),
  resultsView: document.getElementById("resultsView"),
  likesList: document.getElementById("likesList"),
  dislikesList: document.getElementById("dislikesList"),
  likesCountBadge: document.getElementById("likesCountBadge"),
  dislikesCountBadge: document.getElementById("dislikesCountBadge"),
  statTotal: document.getElementById("statTotal"),
  statRemaining: document.getElementById("statRemaining"),
  statLikes: document.getElementById("statLikes"),
  statDislikes: document.getElementById("statDislikes"),
  decisionLike: document.querySelector(".decision-like"),
  decisionNope: document.querySelector(".decision-nope"),
};

window.addEventListener("DOMContentLoaded", () => {
  fetch("./data/skins.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      state.sourceSkins = Array.isArray(data) ? dedupeSkins(data) : [];
      window.debugLoL = {
        state,
        dedupeSkins,
        isLikelyChromaSkin,
        isSpecialVariantSkin,
        keepOnlyMainSkins,
        getSplashKey,
      };
      init();
    })
    .catch((err) => {
      console.error("FEHLER BEIM LADEN:", err);
      els.deckTitle.textContent = "Fehler beim Laden";
      els.cardStack.innerHTML = `
        <div class="empty-state">
          <h3>Skins konnten nicht geladen werden</h3>
          <p>Prüfe ./data/skins.json und die Browser-Konsole.</p>
        </div>
      `;
    });
});

function init() {
  populateChampionFilter();
  bindEvents();
  applyFilters();
  render();
}

function bindEvents() {
  [
    els.searchInput,
    els.championFilter,
    els.sortMode,
    els.skipBaseSkins,
    els.onlyUnrated,
    els.onlyFemale,
    els.onlyMale,
    els.showChromas,
    els.mainSkinsOnly,
  ].forEach((el) => {
    el.addEventListener("input", onFiltersChange);
    el.addEventListener("change", onFiltersChange);
  });

  els.onlyFemale.addEventListener("change", () => {
    if (els.onlyFemale.checked) els.onlyMale.checked = false;
  });
  els.onlyMale.addEventListener("change", () => {
    if (els.onlyMale.checked) els.onlyFemale.checked = false;
  });

  els.likeBtn.addEventListener("click", () => voteTopCard("like"));
  els.dislikeBtn.addEventListener("click", () => voteTopCard("dislike"));
  els.skipBtn.addEventListener("click", cycleTopCard);
  els.undoBtn.addEventListener("click", undoVote);
  els.resetBtn.addEventListener("click", resetVotes);
  els.viewDeckBtn.addEventListener("click", () => setView("deck"));
  els.viewResultsBtn.addEventListener("click", () => setView("results"));
  els.showResultsBtn.addEventListener("click", () => setView("results"));

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") voteTopCard("like");
    if (event.key === "ArrowLeft") voteTopCard("dislike");
    if (event.key === "ArrowDown") cycleTopCard();
  });
}

function onFiltersChange() {
  applyFilters();
  render();
}

function applyFilters() {
  const term = els.searchInput.value.trim().toLowerCase();
  const champ = els.championFilter.value;
  const sortMode = els.sortMode.value;
  const skipBase = els.skipBaseSkins.checked;
  const onlyUnrated = els.onlyUnrated.checked;
  const onlyFemale = els.onlyFemale.checked;
  const onlyMale = els.onlyMale.checked;
  const showChromas = els.showChromas.checked;
  const mainSkinsOnly = els.mainSkinsOnly.checked;

  let list = [...state.sourceSkins].filter((skin) => {
    const skinName = getSkinName(skin);
    const championName = getChampionName(skin);
    const championId = getChampionId(skin);
    const gender = getChampionGender(championId);

    if (!showChromas && isLikelyChromaSkin(skin)) return false;

    const matchesText =
      !term ||
      [skinName, championName, championId].join(" ").toLowerCase().includes(term);

    const matchesChamp = champ === "all" || championId === champ;
    const matchesBase = !skipBase || !skin.isBase;
    const matchesRated = !onlyUnrated || !state.votes[skin.id];
    const matchesFemale = !onlyFemale || gender === "female";
    const matchesMale = !onlyMale || gender === "male";

    return matchesText && matchesChamp && matchesBase && matchesRated && matchesFemale && matchesMale;
  });

  if (mainSkinsOnly) {
    list = keepOnlyMainSkins(list);
  }

  if (sortMode === "random") list = shuffle(list);
  if (sortMode === "champion") {
    list.sort((a, b) =>
      getChampionName(a).localeCompare(getChampionName(b)) ||
      getSkinName(a).localeCompare(getSkinName(b))
    );
  }
  if (sortMode === "skin") {
    list.sort((a, b) => getSkinName(a).localeCompare(getSkinName(b)));
  }

  state.filteredSkins = list;
}

function render() {
  renderStats();
  renderDeck();
  renderResults();
}

function renderDeck() {
  const undecided = state.filteredSkins.filter((skin) => !state.votes[skin.id]);

  els.cardStack.innerHTML = "";
  els.deckTitle.textContent = undecided.length
    ? `${undecided.length} Skins im Deck`
    : "Deck ist leer";

  if (!undecided.length) {
    els.cardStack.innerHTML = `
      <div class="empty-state">
        <h3>Alles durchgeswiped</h3>
        <p>Wechsle zu Matches oder ändere deine Filter.</p>
      </div>
    `;
    return;
  }

  const visibleCards = undecided.slice(0, 3).reverse();
  visibleCards.forEach((skin, index) => {
    const card = createCard(skin, index, visibleCards.length);
    els.cardStack.appendChild(card);
  });

  const topCard = els.cardStack.querySelector(".card:last-child");
  if (topCard) attachDrag(topCard);
}

function createCard(skin, index, total) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.skinId = skin.id;

  const offset = (total - index - 1) * 8;
  card.style.transform = `translateY(${offset}px) scale(${1 - offset * 0.01})`;
  card.style.zIndex = String(100 + index);

  const typeLabel = skin.isBase ? "Base" : "Skin";
  const cardImage = getPreferredImage(skin);

  card.innerHTML = `
    <img src="${escapeHtml(cardImage)}" alt="${escapeHtml(getSkinName(skin))}" loading="eager" />
    <div class="card-info">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(getChampionName(skin))}</span>
        <span class="meta-pill">${escapeHtml(typeLabel)}</span>
        <span class="meta-pill">${escapeHtml(skin.patch || "latest")}</span>
      </div>
      <h3 class="card-title">${escapeHtml(getSkinName(skin))}</h3>
      <p class="card-subline">${escapeHtml(getChampionName(skin))}</p>
    </div>
  `;

  return card;
}

function attachDrag(card) {
  const pointerDown = (event) => {
    const startX = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
    const startY = event.clientY ?? event.touches?.[0]?.clientY ?? 0;
    state.drag = { card, startX, startY, dx: 0, dy: 0 };
    card.setPointerCapture?.(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!state.drag || state.drag.card !== card) return;
    const clientX = event.clientX ?? event.touches?.[0]?.clientX ?? state.drag.startX;
    const clientY = event.clientY ?? event.touches?.[0]?.clientY ?? state.drag.startY;
    state.drag.dx = clientX - state.drag.startX;
    state.drag.dy = clientY - state.drag.startY;

    const rotate = state.drag.dx * 0.06;
    card.style.transition = "none";
    card.style.transform = `translate(${state.drag.dx}px, ${state.drag.dy}px) rotate(${rotate}deg)`;

    const likeOpacity = Math.max(0, state.drag.dx / 120);
    const nopeOpacity = Math.max(0, -state.drag.dx / 120);
    if (els.decisionLike) els.decisionLike.style.opacity = String(Math.min(likeOpacity, 1));
    if (els.decisionNope) els.decisionNope.style.opacity = String(Math.min(nopeOpacity, 1));
  };

  const pointerUp = () => {
    if (!state.drag || state.drag.card !== card) return;
    const { dx } = state.drag;
    if (els.decisionLike) els.decisionLike.style.opacity = "0";
    if (els.decisionNope) els.decisionNope.style.opacity = "0";
    card.style.transition = "transform 0.22s ease";

    if (dx > 120) return animateVote(card, "like");
    if (dx < -120) return animateVote(card, "dislike");

    card.style.transform = "translate(0,0) rotate(0deg)";
    state.drag = null;
  };

  card.addEventListener("pointerdown", pointerDown);
  card.addEventListener("pointermove", pointerMove);
  card.addEventListener("pointerup", pointerUp);
  card.addEventListener("pointercancel", pointerUp);
}

function voteTopCard(type) {
  const top = getTopUndecidedSkin();
  if (!top) return;
  const topCard = els.cardStack.querySelector(".card:last-child");

  if (topCard) {
    animateVote(topCard, type);
  } else {
    storeVote(top.id, type);
    render();
  }
}

function animateVote(card, type) {
  const direction = type === "like" ? 1 : -1;
  card.style.transition = "transform 0.25s ease, opacity 0.25s ease";
  card.style.transform = `translate(${direction * 520}px, -40px) rotate(${direction * 24}deg)`;
  card.style.opacity = "0";

  const skinId = card.dataset.skinId;
  window.setTimeout(() => {
    storeVote(skinId, type);
    render();
    state.drag = null;
  }, 180);
}

function cycleTopCard() {
  const undecided = state.filteredSkins.filter((skin) => !state.votes[skin.id]);
  if (undecided.length <= 1) return;

  const firstId = undecided[0].id;
  const index = state.filteredSkins.findIndex((skin) => skin.id === firstId);
  if (index === -1) return;

  const [item] = state.filteredSkins.splice(index, 1);
  state.filteredSkins.push(item);
  renderDeck();
  renderStats();
}

function undoVote() {
  const last = state.history.pop();
  if (!last) return;

  delete state.votes[last.skinId];
  saveJson(STORAGE_KEY, state.votes);
  saveJson(HISTORY_KEY, state.history);

  applyFilters();
  render();
}

function resetVotes() {
  if (!window.confirm("Wirklich alle Like/Nope-Votes löschen?")) return;

  state.votes = {};
  state.history = [];
  saveJson(STORAGE_KEY, state.votes);
  saveJson(HISTORY_KEY, state.history);

  applyFilters();
  render();
}

function storeVote(skinId, type) {
  state.votes[skinId] = type;
  state.history.push({ skinId, type, at: Date.now() });
  saveJson(STORAGE_KEY, state.votes);
  saveJson(HISTORY_KEY, state.history);
}

function renderResults() {
  const likes = state.sourceSkins.filter((skin) => state.votes[skin.id] === "like");
  const dislikes = state.sourceSkins.filter((skin) => state.votes[skin.id] === "dislike");

  els.likesCountBadge.textContent = String(likes.length);
  els.dislikesCountBadge.textContent = String(dislikes.length);

  renderResultList(els.likesList, likes, "Noch keine Matches.");
  renderResultList(els.dislikesList, dislikes, "Noch keine No-Matches.");
}

function renderResultList(container, items, emptyText) {
  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = `<div class="empty-state"><p>${escapeHtml(emptyText)}</p></div>`;
    return;
  }

  items.forEach((skin) => {
    const entry = document.createElement("article");
    entry.className = "result-card";
    entry.innerHTML = `
      <img src="${escapeHtml(getPreferredImage(skin))}" alt="${escapeHtml(getSkinName(skin))}" loading="lazy" />
      <div class="result-card-content">
        <h4>${escapeHtml(getSkinName(skin))}</h4>
        <p>${escapeHtml(getChampionName(skin))}</p>
        <div class="meta-row">
          <span class="meta-pill">${skin.isBase ? "Base" : "Skin"}</span>
          <span class="meta-pill">${escapeHtml(getChampionGender(getChampionId(skin)))}</span>
        </div>
      </div>
    `;
    container.appendChild(entry);
  });
}

function renderStats() {
  const total = state.filteredSkins.length;
  const remaining = state.filteredSkins.filter((skin) => !state.votes[skin.id]).length;
  const likes = Object.values(state.votes).filter((v) => v === "like").length;
  const dislikes = Object.values(state.votes).filter((v) => v === "dislike").length;

  els.statTotal.textContent = String(total);
  els.statRemaining.textContent = String(remaining);
  els.statLikes.textContent = String(likes);
  els.statDislikes.textContent = String(dislikes);
}

function populateChampionFilter() {
  els.championFilter.innerHTML = `<option value="all">Alle Champions</option>`;

  const champions = [
    ...new Map(
      state.sourceSkins.map((skin) => [getChampionId(skin), getChampionName(skin)])
    ).entries(),
  ]
    .filter(([id]) => Boolean(id))
    .sort((a, b) => String(a[1]).localeCompare(String(b[1])));

  champions.forEach(([id, name]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    els.championFilter.appendChild(option);
  });
}

function setView(view) {
  state.currentView = view;
  els.deckView.classList.toggle("active", view === "deck");
  els.resultsView.classList.toggle("active", view === "results");
  els.viewDeckBtn.classList.toggle("active", view === "deck");
  els.viewResultsBtn.classList.toggle("active", view === "results");
}

function getTopUndecidedSkin() {
  return state.filteredSkins.find((skin) => !state.votes[skin.id]);
}

function getChampionId(skin) {
  return String(skin.championId || skin.champion || "").trim();
}

function getChampionName(skin) {
  return String(skin.championName || skin.champion || "Unknown Champion").trim();
}

function getSkinName(skin) {
  return String(skin.skinName || skin.skin || "Unknown Skin").trim();
}

function getPreferredImage(skin) {
  return skin.loadingImage || skin.image || skin.splashPath || skin.splash_url || skin.tilePath || "";
}

function getChampionGender(championId) {
  return CHAMPION_GENDERS[championId] || "unknown";
}

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasParenthesisVariantName(skin) {
  const rawName = getSkinName(skin);
  return PARENTHESIS_VARIANT_NAME_RX.test(String(rawName || ""));
}

function isSpecialVariantSkin(skin) {
  const name = normalizeName(getSkinName(skin));
  if (!name) return false;

  if (hasParenthesisVariantName(skin)) return true;
  return SPECIAL_VARIANT_MARKERS.some((marker) => name.includes(marker));
}

function getSplashKey(skin) {
  const raw = getPreferredImage(skin);
  if (!raw) return "";

  return String(raw)
    .toLowerCase()
    .replace(/\?.*$/, "")
    .replace(/^https?:\/\/[^/]+/, "")
    .trim();
}

function scoreMainSkinCandidate(skin) {
  let score = 0;
  const name = getSkinName(skin);

  if (!skin.isBase) score += 200;
  if (!isLikelyChromaSkin(skin)) score += 100;
  if (!isSpecialVariantSkin(skin)) score += 50;
  if (skin.parentSkin === undefined || skin.parentSkin === null) score += 25;
  if (skin.skinNum !== undefined && skin.skinNum !== null) {
    score -= Number(skin.skinNum) * 0.01;
  }

  score -= String(name || "").length * 0.1;
  return score;
}

function keepOnlyMainSkins(items) {
  const withoutNamedVariants = items.filter((skin) => !hasParenthesisVariantName(skin));
  const source = withoutNamedVariants.length ? withoutNamedVariants : items;
  const bestBySplash = new Map();

  for (const skin of source) {
    const splashKey = getSplashKey(skin);
    const key = splashKey || `fallback:${getChampionId(skin)}:${String(skin.skinNum ?? skin.num ?? skin.id ?? getSkinName(skin)).toLowerCase()}`;
    const current = bestBySplash.get(key);

    if (!current || scoreMainSkinCandidate(skin) > scoreMainSkinCandidate(current)) {
      bestBySplash.set(key, skin);
    }
  }

  return source.filter((skin) => {
    const splashKey = getSplashKey(skin);
    const key = splashKey || `fallback:${getChampionId(skin)}:${String(skin.skinNum ?? skin.num ?? skin.id ?? getSkinName(skin)).toLowerCase()}`;
    return bestBySplash.get(key) === skin;
  });
}

function isLikelyChromaSkin(skin) {
  if (skin.parentSkin !== undefined && skin.parentSkin !== null) return true;
  if (hasParenthesisVariantName(skin)) return true;

  const name = getSkinName(skin).toLowerCase();
  if (!name) return false;

  for (const marker of CHROMA_MARKERS) {
    if (name.includes(`(${marker})`)) return true;
    if (name.endsWith(` ${marker}`)) return true;
    if (name === marker) return true;
  }

  return false;
}

function dedupeSkins(items) {
  const seen = new Map();

  for (const skin of items) {
    const championId = getChampionId(skin);
    const skinNum = String(skin.skinNum ?? skin.num ?? "");
    const skinName = getSkinName(skin).toLowerCase();
    const key = skin.id || `${championId}-${skinNum}-${skinName}`;

    if (!seen.has(key)) {
      seen.set(key, skin);
    }
  }

  return [...seen.values()];
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function shuffle(input) {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
