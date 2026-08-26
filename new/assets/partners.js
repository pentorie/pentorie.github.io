(() => {
  const grid = document.querySelector("#partnerGrid");
  if (!grid) return;

  const partners = [
    { id: "gazprom", src: "assets/logos/gazprom.svg", alt: "Газпром трансгаз Томск" },
    { id: "federation", src: "assets/logos/judo-federation.svg", alt: "Федерация дзюдо России" },
    { id: "latat", src: "assets/logos/latat.svg", alt: "LATAT" },
    { id: "department", src: "assets/logos/sport-department.svg", alt: "Департамент спорта Томской области" },
    { id: "minsport", src: "assets/logos/minsport.svg", alt: "Министерство спорта Российской Федерации" },
    { id: "olympic", src: "assets/logos/olympic.svg", alt: "Олимпийский комитет России" },
  ];

  let paused = false;
  let timer;
  let cells = [];
  let contents = [];

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function applyContent(cell, partner) {
    cell.replaceChildren();
    cell.classList.toggle("logo", Boolean(partner));
    cell.classList.toggle("pattern", !partner);
    cell.removeAttribute("data-logo");
    cell.removeAttribute("aria-hidden");

    if (!partner) {
      cell.setAttribute("aria-hidden", "true");
      const img = document.createElement("img");
      img.src = "assets/logos/judo.svg";
      img.alt = "";
      cell.appendChild(img);
      return;
    }

    cell.dataset.logo = partner.id;
    const img = document.createElement("img");
    img.src = partner.src;
    img.alt = partner.alt;
    cell.appendChild(img);
  }

  function createGrid() {
    contents = shuffle([...partners, ...Array(9).fill(null)]);
    const fragment = document.createDocumentFragment();

    cells = contents.map((partner, index) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.cellIndex = String(index);
      cell.style.animationDelay = `${index * 38}ms`;
      applyContent(cell, partner);
      fragment.appendChild(cell);
      return cell;
    });

    grid.appendChild(fragment);
    setTimeout(() => cells.forEach((cell) => cell.classList.add("is-ready")), 920);
  }

  function moveOneLogo() {
    const logoIndexes = contents.flatMap((item, index) => item ? [index] : []);
    const patternIndexes = contents.flatMap((item, index) => item ? [] : [index]);
    const from = logoIndexes[Math.floor(Math.random() * logoIndexes.length)];
    const to = patternIndexes[Math.floor(Math.random() * patternIndexes.length)];
    const changingCells = [cells[from], cells[to]];

    changingCells.forEach((cell) => cell.classList.add("is-updating"));
    setTimeout(() => {
      [contents[from], contents[to]] = [contents[to], contents[from]];
      applyContent(cells[from], contents[from]);
      applyContent(cells[to], contents[to]);

      requestAnimationFrame(() => requestAnimationFrame(() => {
        changingCells.forEach((cell) => cell.classList.remove("is-updating"));
      }));
    }, 340);
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (paused) return schedule();
      moveOneLogo();
      schedule();
    }, 2600 + Math.random() * 900);
  }

  window.addEventListener("sila:pause", (event) => {
    paused = event.detail;
    if (!paused) schedule();
  });

  createGrid();
  schedule();
})();
