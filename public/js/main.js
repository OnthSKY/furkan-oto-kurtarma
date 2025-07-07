// Sayfa yüklendiğinde loader'ı gizle
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-700");
    setTimeout(() => loader.remove(), 700); // tamamen DOM'dan sil
  }
});

// Fade animasyonlarını görünür hale getirme
if (!window._furkanObserverInitialized) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade').forEach(el => observer.observe(el));
  window._furkanObserverInitialized = true;
}

// Mobil menü toggle işlemi
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
}

// Scroll ile aktif menü bağlantısını vurgulama
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.dataset.link === current) {
      link.classList.add("active-link");
    }
  });
});

const thumbSwiper = new Swiper(".thumbSwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      640: { slidesPerView: 4 },
      768: { slidesPerView: 6 },
      1024: { slidesPerView: 8 },
    }
  });

  const mainSwiper = new Swiper(".mainSwiper", {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    thumbs: {
      swiper: thumbSwiper,
    },
  });

  new Swiper(".reviewSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

document.querySelectorAll(".faq-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector("span");
    const isOpen = !content.classList.contains("hidden");

    document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
    document.querySelectorAll(".faq-toggle span").forEach(s => s.textContent = "+");

    if (!isOpen) {
      content.classList.remove("hidden");
      icon.textContent = "−";
    }
  });
});

let modalOpenedFromURL = false;

function openModal(id) {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById(id);

  if (overlay && modal) {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // scroll engelle

    // URL’yi sadece manuel açmada güncelle
    if (!modalOpenedFromURL) {
      const blogNum = id.replace('blog', '');
      const url = new URL(window.location);
      url.searchParams.set('blog', blogNum);
      history.pushState({}, '', url);
    }
  }
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.add('hidden');
  document.querySelectorAll('.modal-content').forEach(modal => modal.classList.add('hidden'));
  document.body.classList.remove('overflow-hidden'); // scroll'u geri getir
  history.replaceState(null, null, window.location.pathname); // URL’i temizle
}


window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get('blog');
  if (blogId && document.getElementById(`blog${blogId}`)) {
    modalOpenedFromURL = true;
    openModal(`blog${blogId}`);
  }
});
