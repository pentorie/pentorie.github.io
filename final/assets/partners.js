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
    { id: "strong-choice", src: "assets/logos/strong-choice.svg", alt: "Выбор сильных" },
  ];

  const columns = 18;
  const rows = 9;
  const featureStarts = new Map([
    [1, [0, 7, 14]],
    [3, [4, 10]],
  ]);
  const eventCopy = "ВСЕРОССИЙСКИЕ СОРЕВНОВАНИЯ<br>ПО ДЗЮДО НА ПРИЗЫ<br>ООО «ГАЗПРОМ ТРАНСГАЗ ТОМСК»";
  let featureIndex = 0;

  function getPartner(row, column) {
    const shiftedIndex = (column - row) % partners.length;
    return partners[(shiftedIndex + partners.length) % partners.length];
  }

  function place(cell, row, column, span = 1) {
    cell.style.gridRow = String(row + 1);
    cell.style.gridColumn = `${column + 1} / span ${span}`;
  }

  function createPartnerCell(partner, row, column) {
    const cell = document.createElement("div");
    cell.className = "grid-cell logo";
    cell.dataset.logo = partner.id;
    place(cell, row, column);
    const img = document.createElement("img");
    img.src = partner.src;
    img.alt = partner.alt;
    cell.appendChild(img);
    return cell;
  }

  function createSilaCell(row, column) {
    const cell = document.createElement("div");
    cell.className = "grid-cell sila-mark-cell";
    cell.style.setProperty("--sila-delay", `${featureIndex * -0.7}s`);
    place(cell, row, column);
    cell.innerHTML = `
      <div class="partner-sila-flat">
        <img class="partner-sila-face partner-sila-front" src="assets/logos/sila-combined.svg" alt="Сила Сибири">
        <img class="partner-sila-face partner-sila-back" src="assets/logos/sila-combined.svg" alt="" aria-hidden="true">
      </div>`;
    featureIndex += 1;
    return cell;
  }

  function createEventCell(row, column) {
    const cell = document.createElement("div");
    cell.className = "grid-cell event-cell";
    place(cell, row, column, 3);
    cell.innerHTML = `<span>${eventCopy}</span>`;
    return cell;
  }

  const fragment = document.createDocumentFragment();
  for (let row = 0; row < rows; row += 1) {
    const starts = featureStarts.get(row) || [];
    let column = 0;

    while (column < columns) {
      if (starts.includes(column)) {
        fragment.appendChild(createSilaCell(row, column));
        fragment.appendChild(createEventCell(row, column + 1));
        column += 4;
        continue;
      }

      fragment.appendChild(createPartnerCell(getPartner(row, column), row, column));
      column += 1;
    }
  }

  grid.appendChild(fragment);
})();
