// NEUTRON LLC Theme JS

// Header scroll effect
const header = document.querySelector('.neutron-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile nav
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-close');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

if (mobileClose && mobileNav) {
  mobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .product-card, .stat-item, .why-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Cart count
async function updateCartCount() {
  try {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    const bubbles = document.querySelectorAll('.cart-bubble');
    bubbles.forEach(b => {
      b.textContent = cart.item_count;
      b.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });
  } catch(e) {}
}

updateCartCount();
document.addEventListener('cart:updated', updateCartCount);

// Number counter animation
function animateNumber(el, target, duration = 1500) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (!isNaN(target)) animateNumber(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => statObserver.observe(el));
