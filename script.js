// Share button — Web Share API on mobile, clipboard fallback on desktop
function shareCV() {
  const data = {
    title: 'Bastien Bretenet — Dev Full Stack & IA',
    text: 'Profil de Bastien Bretenet, développeur full stack senior en route vers l\'IA.',
    url: window.location.href,
  };
  if (navigator.share) {
    navigator.share(data);
  } else {
    navigator.clipboard.writeText(window.location.href).then(function () {
      const fb = document.getElementById('share-feedback');
      if (!fb) return;
      fb.style.display = 'inline';
      setTimeout(function () { fb.style.display = 'none'; }, 2500);
    });
  }
}

// Before/After photo slider
(function () {
  const slider = document.getElementById('ba-slider');
  const range = document.getElementById('ba-range');
  if (!slider || !range) return;
  function apply() {
    slider.style.setProperty('--pos', range.value + '%');
  }
  range.addEventListener('input', apply);
  apply();
})();

// Visitor counter — static, 90s style
(function () {
  const el = document.getElementById('visitor-count');
  if (el) el.textContent = '0001337';
})();

// Clock in footer
(function () {
  const el = document.getElementById('retro-clock');
  if (!el) return;
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.textContent = h + ':' + m + ':' + s;
  }
  tick();
  setInterval(tick, 1000);
})();
