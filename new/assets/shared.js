(() => {
  const screenNumber = Number(document.body.dataset.screen || 1);

  function createBackground() {
    const root = document.createElement("div");
    root.className = "ambient-bg";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = '<div class="ambient-vignette"></div>';

    document.body.prepend(root);
    document.body.insertAdjacentHTML("beforeend", '<div class="paused-indicator">Анимация приостановлена</div>');
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
