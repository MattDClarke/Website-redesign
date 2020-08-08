const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
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
  autoHeight: true,
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
  zoom: {
    maxRatio: 2,
    toggle: true, // enable zoom-in by double tapping slide
  },

  // navigation: {
  //     hideOnClick: true,
  // },

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

const closeBtnModal = document.querySelector('.close-btn-modal');
const nextBtn = document.querySelector('#swiper-button-next-modal');
const prevBtn = document.querySelector('#swiper-button-prev-modal');
const modalImg = document.querySelectorAll('.swiper-slide-img-modal');
swiperModal.on('zoomChange', function() {
  if (swiperModal.zoom.scale === 1) {
    // it was zoomed out when zoomChange event fired (click)... now zoomed in
    swiperModal.keyboard.disable();
    swiperModal.allowSlideNext = false;
    swiperModal.allowSlidePrev = false;
    closeBtnModal.style.display = 'none';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    modalImg.forEach(element => {
      element.style.cursor = 'zoom-out';
    });
  } else {
    console.log('zoomed out');
    swiperModal.keyboard.enable();
    swiperModal.allowSlideNext = true;
    swiperModal.allowSlidePrev = true;
    closeBtnModal.style.display = 'block';
    nextBtn.style.display = 'flex';
    prevBtn.style.display = 'flex';
    swiperModal.navigation.update();
    modalImg.forEach(element => {
      element.style.cursor = 'zoom-in';
    });
  }
});

// hacky attempt to fix initial height issue (extra space below image initially...)
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    swiper.update();
  }, 40);
});

// Create a Modal With HTML, CSS & JavaScript (https://www.youtube.com/watch?v=6ophW7Ask_0)
// Get modal element
const modal = document.getElementById('simpleModal');
// Get open modal button
const modalBtn = document.querySelectorAll('.swiper-slide-img-non-modal'); // select all swiper-slides (outside modal)
// close button
// var closeBtnModal = document.getElementsByClassName('close-btn-modal')[0]; // returns an array... just get first one (only one element with this class)

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
