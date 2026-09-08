document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Révélation au scroll : chaque section apparaît une fois, discrètement.
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Section active : nav du header + rail façon arborescence de fichiers.
const sectionIds = ['apropos', 'competences', 'experiences', 'formation', 'contact'];
const navLinks = document.querySelectorAll('[data-nav]');
const railLinks = document.querySelectorAll('[data-rail]');

const setActive = (id) => {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${id}`;
    if (isCurrent) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
  railLinks.forEach((link) => {
    const isCurrent = link.dataset.rail === id;
    if (isCurrent) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

  sections.forEach((section) => sectionObserver.observe(section));
}

// Modales génériques (ouverture/fermeture via data-open-modal / data-close-modal).
document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.openModal);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  });
});

document.querySelectorAll('[id^="modal-"]').forEach((modal) => {
  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };
  modal.querySelectorAll('[data-close-modal]').forEach((btn) => btn.addEventListener('click', close));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });
});

// Slider avant / après (croquis vs image générée).
document.querySelectorAll('.ba-slider').forEach((slider) => {
  const after = slider.querySelector('.ba-slider-after');
  const handle = slider.querySelector('.ba-slider-handle');
  const input = slider.querySelector('.ba-slider-input');

  const setPosition = (percent) => {
    const clamped = Math.min(100, Math.max(0, percent));
    after.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    handle.style.left = `${clamped}%`;
  };

  input.addEventListener('input', () => setPosition(Number(input.value)));
});
