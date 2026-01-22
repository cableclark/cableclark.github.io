"use strict";

// ------------------------------------------------------------------------------ //
// Overlay Menu Navigation
// ------------------------------------------------------------------------------ //
var overlayMenu = function () {
  const menuBtn = document.querySelector('.menu-btn');
  const body = document.querySelector('body');
  
  if (!menuBtn) return;

  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('Menu clicked');
    body.classList.toggle('nav-active');
  });
};

// ------------------------------------------------------------------------------ //
// Animate Texts (Letter by Letter)
// ------------------------------------------------------------------------------ //
var initTextFx = function () {
  const elements = document.querySelectorAll('.txt-fx');
  
  elements.forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    let count = 0;
    const delay = 100;
    const stagger = 10;
    
    const htmlOutput = words.map(word => {
      let wordHtml = '<span class="word">';
      for (let i = 0; i < word.length; i++) {
        wordHtml += `<span class='letter' style='transition-delay:${delay + stagger * count}ms;'>${word[i]}</span>`;
        count++;
      }
      wordHtml += '</span>';
      count++; // space count
      return wordHtml;
    }).join(`<span class='letter' style='transition-delay:${delay}ms;'>&nbsp;</span>`);

    el.innerHTML = htmlOutput;
  });
};

// ------------------------------------------------------------------------------ //
// Isotope Portfolio (Uses the Vanilla JS version of Isotope)
// ------------------------------------------------------------------------------ //
var initIsotope = function() {
  const gridEl = document.querySelector('.grid');
  if (!gridEl) return;

  // Initialize Isotope
  var iso = new Isotope(gridEl, {
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  // Filter Buttons
  const filterButtons = document.querySelectorAll('.button-group a');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = btn.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });

      // Change active class
      filterButtons.forEach(b => b.classList.remove('is-checked'));
      btn.classList.add('is-checked');
    });
  });
};

// ------------------------------------------------------------------------------ //
// Lightbox & Animations
// ------------------------------------------------------------------------------ //
var initChocolat = function() {
  if (typeof Chocolat !== 'undefined') {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    });
  }
};

// ------------------------------------------------------------------------------ //
// Initialize everything on Load
// ------------------------------------------------------------------------------ //
document.addEventListener('DOMContentLoaded', function () {
  overlayMenu();
  initTextFx();
  initChocolat();

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      once: true
    });
  }
});

// Window Load for Isotope and Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 600);
  }
  
  // 1. Initialize Isotope
  initIsotope();

  // 2. IMPORTANT: Tell AOS to recalculate positions 
  // now that the grid has settled.
  if (typeof AOS !== 'undefined') {
    AOS.refresh(); 
  }
});

let body = document.querySelector('body');
let menubtn = document.querySelector('.menu-btn');
let menuItems = document.querySelectorAll('.nav__list-item');

function applyListeners() {
      
      menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
          return toggleClass(body, 'nav-active');
      });
      })
    };
  
  function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };

  applyListeners();

  document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.portfolio-Swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 3 },
      }
    });
  });