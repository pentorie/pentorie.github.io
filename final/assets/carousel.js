(() => {
  const card = document.querySelector("#sequenceCard");
  const progress = document.querySelector("#sequenceProgress");
  if (!card || !progress) return;

  const sequence = [
    { id: "qr", type: "logo", src: "assets/qr-sila.png", alt: "QR-код Сила Сибири", mainIndex: 0 },
    { id: "sila", type: "sila", src: "assets/logos/sila-mark.svg", alt: "Сила Сибири", mainIndex: 0 },
    { id: "gazprom", type: "logo", src: "assets/logos/gazprom.svg", alt: "Газпром трансгаз Томск", mainIndex: 1 },
    { id: "sila", type: "sila", src: "assets/logos/sila-mark.svg", alt: "Сила Сибири", mainIndex: 1 },
    { id: "federation", type: "logo", src: "assets/logos/judo-federation.svg", alt: "Федерация дзюдо России", mainIndex: 2 },
    { id: "sila", type: "sila", src: "assets/logos/sila-mark.svg", alt: "Сила Сибири", mainIndex: 2 },
    { id: "latat", type: "logo", src: "assets/logos/latat.svg", alt: "LATAT", mainIndex: 3 },
    { id: "sila", type: "sila", src: "assets/logos/sila-mark.svg", alt: "Сила Сибири", mainIndex: 3 },
    { id: "strong-choice", type: "logo", src: "assets/logos/strong-choice.svg", alt: "Выбор сильных", mainIndex: 4 },
    { id: "sila", type: "sila", src: "assets/logos/sila-mark.svg", alt: "Сила Сибири", mainIndex: 4 },
  ];

  let index = 0;
  let paused = false;
  let timer;

  const mainItemCount = Math.max(...sequence.map((item) => item.mainIndex)) + 1;
  Array.from({ length: mainItemCount }).forEach((_, dotIndex) => {
    const dot = document.createElement("i");
    dot.className = `progress-dot${dotIndex === 0 ? " active" : ""}`;
    progress.appendChild(dot);
  });

  function render(item) {
    card.classList.toggle("sila-card", item.type === "sila");
    card.dataset.content = item.id;
    card.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
    progress.querySelectorAll(".progress-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === item.mainIndex);
    });
  }

  function schedule() {
    clearTimeout(timer);
    const duration = sequence[index].type === "sila" ? 900 : 3900;
    timer = setTimeout(next, duration);
  }

  function next() {
    if (paused) return schedule();
    card.classList.add("is-flipping");
    setTimeout(() => {
      index = (index + 1) % sequence.length;
      render(sequence[index]);
      card.classList.remove("is-flipping");
      card.classList.add("is-revealing");
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove("is-revealing")));
      schedule();
    }, 560);
  }

  window.addEventListener("sila:pause", (event) => {
    paused = event.detail;
    if (!paused) schedule();
  });

  render(sequence[index]);
  schedule();
})();
