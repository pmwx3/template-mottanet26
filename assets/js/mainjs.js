new Swiper(".cards_slide", {
  spaceBetween: 30,
  grabCursor: true,

  // Margem no final para indicar que tem mais conteúdo
  slidesOffsetAfter: 40,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1.15,
      spaceBetween: 12,
      slidesOffsetBefore: 10,
      slidesOffsetAfter: 40,
    },
    576: {
      slidesPerView: 1.4,
      spaceBetween: 15,
      slidesOffsetAfter: 40,
    },
    768: {
      slidesPerView: 2.15,
      spaceBetween: 20,
      slidesOffsetAfter: 40,
    },
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 20,
      slidesOffsetAfter: 40,
    },
    1366: {
      slidesPerView: 3.2,
      spaceBetween: 18,
      slidesOffsetAfter: 40,
    },
    1500: {
      slidesPerView: 4, // <- não fecha em 4 exatos, sobra peek do próximo
      spaceBetween: 28,
      slidesOffsetAfter: 40,
    },
  },
});

// MottaVIsion

const swiper = new Swiper(".mySwiperPlanosMV", {
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: false,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // Mobile maior / Tablet
    768: {
      slidesPerView: 2,
    },
    // Desktop
    1024: {
      slidesPerView: 4,
      allowTouchMove: true,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  let swiperInstance = null;

  function buildSwiper() {
    const col = document.querySelector(".main_card_planos3 .col-lg-8");
    if (!col) return;

    // Evita duplicar se já foi inicializado
    if (col.querySelector(".swiper-planos")) return;

    const originalRow = col.querySelector(".row");
    const cards = originalRow.querySelectorAll(".col-md-6");
    if (!cards.length) return;

    // Cria estrutura do Swiper
    const swiperEl = document.createElement("div");
    swiperEl.className = "swiper swiper-planos";

    const wrapper = document.createElement("div");
    wrapper.className = "swiper-wrapper";

    cards.forEach(function (card) {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.appendChild(card.cloneNode(true));
      wrapper.appendChild(slide);
    });

    const pagination = document.createElement("div");
    pagination.className = "swiper-pagination";

    swiperEl.appendChild(wrapper);
    swiperEl.appendChild(pagination);

    // Esconde o grid original e injeta o Swiper
    originalRow.style.display = "none";
    col.appendChild(swiperEl);

    // Inicializa o Swiper
    swiperInstance = new Swiper(".swiper-planos", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 16,
      grabCursor: true,
      initialSlide: 1, // começa no Plano Ultra (destaque)
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  function destroySwiper() {
    const col = document.querySelector(".main_card_planos3 .col-lg-8");
    if (!col) return;

    const swiperEl = col.querySelector(".swiper-planos");
    const originalRow = col.querySelector(".row");

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    if (swiperEl) swiperEl.remove();
    if (originalRow) originalRow.style.display = "";
  }

  function handleResize() {
    if (window.innerWidth < 768) {
      buildSwiper();
    } else {
      destroySwiper();
    }
  }

  // Executa na carga e no resize
  handleResize();

  window.addEventListener("resize", handleResize);
});

document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.querySelector(".navbar-expand-lg");

  // ---- Scroll effect ----
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 30) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    },
    { passive: true },
  );

  // ---- Bloqueia click do Bootstrap nos dropdowns em desktop ----
  document
    .querySelectorAll(".navbar .dropdown-toggle")
    .forEach(function (toggle) {
      toggle.addEventListener("click", function (e) {
        if (window.innerWidth >= 992) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });

  // ---- Injeta ícones nos dropdown items ----
  var iconMap = {
    "Internet Residencial": "bi-house-fill",
    "Internet Empresarial": "bi-building",
    "Internet Corporativa": "bi-diagram-3-fill",
    "A Mottanet": "bi-info-circle-fill",
    Cidades: "bi-geo-alt-fill",
    "Central do Assintante": "bi-headset",
    "Central Mottanet": "bi-person-fill",
    "Pague Via PIX": "bi-qr-code",
    "Clube de Vantagens": "bi-star-fill",
  };

  document.querySelectorAll(".navbar .dropdown-item").forEach(function (item) {
    var text = item.textContent.trim();
    var icon = iconMap[text];
    if (icon && !item.querySelector("i")) {
      var i = document.createElement("i");
      i.className = "bi " + icon;
      item.insertBefore(i, item.firstChild);
    }
  });

  // ---- Injeta separadores e CTA no desktop ----
  function buildDesktopExtras() {
    if (window.innerWidth < 992) return;
    if (document.querySelector(".navbar .nav-cta")) return;

    var container = document.querySelector(".navbar .container");

    var sep1 = document.createElement("div");
    sep1.className = "nav-sep";
    var brand = document.querySelector(".navbar-brand");
    brand.after(sep1);

    var sep2 = document.createElement("div");
    sep2.className = "nav-sep";
    container.appendChild(sep2);

    var cta = document.createElement("a");
    cta.href = "https://wa.me/554499999999";
    cta.className = "nav-cta";
    cta.innerHTML = '<i class="bi bi-whatsapp"></i> Assinar Agora';
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
    container.appendChild(cta);
  }

  buildDesktopExtras();

  // Reconstrói se janela redimensionar para desktop
  window.addEventListener(
    "resize",
    function () {
      buildDesktopExtras();
    },
    { passive: true },
  );
});


