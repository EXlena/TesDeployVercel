// Ambil elemen-elemen utama dari DOM
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ============  HAMBURGER MENU TOGGLE ============
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Tutup menu otomatis ketika salah satu link diklik 
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ============  NAVBAR SHADOW ON SCROLL ============
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============ SMOOTH SCROLL KE SECTION ============
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    // Pastikan link mengarah ke anchor (#)
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// ============ SCROLL FADE-IN ANIMATION ============
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Jika elemen masuk ke viewport, tambah class "visible"
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15, // Trigger saat 15% elemen terlihat
  }
);

// Pasang observer ke setiap elemen fade-in
fadeElements.forEach((el) => observer.observe(el));

// ============ LOAD SECTION HTML (Split by file) ============
const sectionIds = ['home', 'about', 'gallery', 'products', 'contact'];

function loadSection(id) {
  const el = document.getElementById(id);
  if (!el) return Promise.resolve();

  // Map: contact footer file is contact.html
  const fileName = id === 'contact' ? 'contact.html' : `${id}.html`;

  return fetch(fileName)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${fileName}`);
      return res.text();
    })
    .then((html) => {
      el.outerHTML = html;

      // Observer untuk elemen fade-in yang baru dimuat
      const newFadeElements = document.querySelectorAll(`#${id} .fade-in, #${id}.fade-in, .fade-in`);
      newFadeElements.forEach((node) => observer.observe(node));

      // Jika hash ada, scroll ulang setelah konten terpasang
      if (window.location.hash === `#${id}`) {
        const target = document.querySelector(`#${id}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

Promise.all(sectionIds.map(loadSection)).then(() => {
  // Jika langsung buka dengan hash, lakukan scroll setelah load selesai
  const hash = window.location.hash;
  if (hash && sectionIds.includes(hash.replace('#', ''))) {
    const id = hash.replace('#', '');
    const target = document.querySelector(`#${id}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ============ CONSOLE LOG SAMBUTAN ============
console.log('%c🛒 Selamat datang di AZI SWALAYAN & FOTOCOPY!', 
  'color: #f97316; font-size: 16px; font-weight: bold;');
