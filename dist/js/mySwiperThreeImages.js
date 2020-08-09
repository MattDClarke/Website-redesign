const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  loop: true,
  preloadImages: false,
  lazy: {
    loadPrevNext: true,
  },
});

const swiper = new Swiper('.swiper-container-main', {
  autoHeight: true, // enable auto height
  observer: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  preloadImages: false,
  lazy: {
    loadPrevNext: true,
  },

  keyboard: {
    enabled: true,
  },

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  thumbs: {
    swiper: galleryThumbs,
  },
});

// swiper - modal
const swiperModal = new Swiper('.swiper-container-modal', {
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  preloadImages: false,
  lazy: {
    loadPrevNext: true,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
});

// Create a Modal With HTML, CSS & JavaScript (https://www.youtube.com/watch?v=6ophW7Ask_0)
const modal = document.getElementById('simpleModal');
const modalBtn = document.querySelectorAll('.swiper-slide-img-non-modal'); // select all swiper-slides (outside modal)
const closeBtnModal = document.getElementsByClassName('close-btn-modal')[0];

// hacky attempt to fix initial height issue (extra space below image initially...)
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.top = `1px`;
  document.body.style.top = `0px`;
});

function openModal() {
  // prevent page scrolling when modal open: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
  // When the modal is shown, we want a fixed body
  document.body.style.position = 'fixed'; // prevents scrolling
  document.body.style.top = `-${window.scrollY}px`; // subtract scroll top, add to body styles

  const swiperIndexPos = swiper.activeIndex;
  swiperModal.slideTo(swiperIndexPos);
  swiperModal.lazy.load(); // need to initailize lazy load if modal opened
  modal.style.display = 'block';
  swiper.keyboard.disable();
  swiperModal.keyboard.enable();
}

function closeModal() {
  // prevent page scrolling when modal open: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
  // When the modal is hidden...
  const scrollY = document.body.style.top; // retrieve scroll location
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);

  const swiperModalIndexPos = swiperModal.activeIndex;
  swiper.slideTo(swiperModalIndexPos);
  modal.style.display = 'none';
  swiperModal.keyboard.disable();
  swiper.keyboard.enable();
}

modalBtn.forEach(element => {
  element.addEventListener('click', openModal); // add an click event listener for each swiper-slide (outside the modal)
});

// Listen for close click
closeBtnModal.addEventListener('click', closeModal);
