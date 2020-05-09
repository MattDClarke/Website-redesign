// Create a Modal With HTML, CSS & JavaScript (https://www.youtube.com/watch?v=6ophW7Ask_0)

// Get modal element
var modal = document.getElementById('simpleModal');
// Get open modal button
// var modalBtn = document.getElementsByClassName('swiper-slide-img')[0];
var modalBtn = document.querySelectorAll('.swiper-slide-img'); // select all swiper-slides (outside modal)
//var modalBtn = document.getElementById('modalBtn');
// close button
var closeBtnModal = document.getElementsByClassName('close-btn-modal')[0]; // returns an array... just get first one (only one element with this class)


modalBtn.forEach(element => { 
    element.addEventListener('click', openModal); // add an click event listener for each swiper-slide (outside the modal)
})

// Listen for close click
closeBtnModal.addEventListener('click', closeModal);

// function open modal
function openModal() {

    // prevent page scrolling when modal open: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    // When the modal is shown, we want a fixed body
    document.body.style.position = 'fixed'; // prevents scrolling
    document.body.style.top = `-${window.scrollY}px`; // subtract scroll top, add to body styles

    // Allow swiper to work when modal opened. From the docs:  https://swiperjs.com/api/
    var mySwiper = document.querySelector('.swiper-container').swiper
    mySwiper.update();
    var mySwiper2 = document.querySelector('.swiper-container--modal').swiper
    mySwiper2.update();

    modal.style.display ='block';
}

// function close modal
function closeModal() {
    
    // prevent page scrolling when modal open: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    // When the modal is hidden...
    const scrollY = document.body.style.top; // retrieve scroll location
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    
    // Allow swiper to work when modal opened. From the docs:  https://swiperjs.com/api/
    var mySwiper = document.querySelector('.swiper-container').swiper
    mySwiper.update();
    var mySwiper2 = document.querySelector('.swiper-container--modal').swiper
    mySwiper2.update();

    modal.style.display = 'none';
}
