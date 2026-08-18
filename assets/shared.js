(() => {
  const screenNumber = Number(document.body.dataset.screen || 1);

  function createBackground() {
    const root = document.createElement("div");
    root.className = "ambient-bg";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = [
      '<div class="ambient-grid"></div>',
      '<div class="ambient-glow"></div>',
      '<div class="flag-fragments"></div>',
      '<div class="ambient-vignette"></div>',
    ].join("");

    const fragments = root.querySelector(".flag-fragments");
    const groups = [7, 20, 34, 49, 64, 79, 92];
    groups.forEach((top, groupIndex) => {
      ["white", "blue", "red"].forEach((color, colorIndex) => {
        const band = document.createElement("i");
        band.className = `flag-band ${color}`;
        band.style.top = `${top + colorIndex * 1.1}vh`;
        band.style.width = `${27 + (groupIndex % 3) * 9}vw`;
        band.style.animationDuration = `${17 + (groupIndex % 4) * 2}s`;
        band.style.animationDelay = `${-groupIndex * 3.4 - colorIndex * .035}s`;
        fragments.appendChild(band);
      });
    });

    document.body.prepend(root);
    document.body.insertAdjacentHTML("beforeend", '<div class="safe-frame" aria-hidden="true"></div><div class="paused-indicator">Анимация приостановлена</div>');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  let paused = false;
  function togglePause() {
    paused = !paused;
    document.body.classList.toggle("is-paused", paused);
    window.dispatchEvent(new CustomEvent("sila:pause", { detail: paused }));
  }

  document.addEventListener("keydown", (event) => {
    if (/^[1-4]$/.test(event.key)) {
      const target = Number(event.key);
      if (target !== screenNumber) window.location.href = `screen-${target}.html`;
    }
    if (event.key.toLowerCase() === "f") toggleFullscreen();
    if (event.code === "Space") {
      event.preventDefault();
      togglePause();
    }
  });

  document.addEventListener("dblclick", toggleFullscreen);
  createBackground();
})();
