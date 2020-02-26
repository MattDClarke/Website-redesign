// // Modified from: How to code a carousel https://www.youtube.com/watch?v=gBzsE0oieio
const track = document.querySelector('.carousel__track');  // select the ul
const slides = Array.from(track.children);
const slidesLength = slides.length; // get length of array (number of images)
var counter = 0; // check postion in slides 
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const slideWidth= slides[0].getBoundingClientRect().width; // get size of the first slide (same for all slides),  get only width of the first slide

const totalWidth = slideWidth * (slidesLength -1) + 'px'; // get total width of all images (when placed next to each other)
// arrange the slides next to one another
// make a function
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';  // change style --> move slide from the left (shift from absolute pos.)
}

slides.forEach(setSlidePosition); // call function for each slide

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; // shift ul
    currentSlide.classList.remove('current-slide'); // remove .current-slide CSS on current slide
    targetSlide.classList.add('current-slide'); // add .current-slide CSS on next slide 
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

// When prev clicked, move to slide on the left
prevButton.addEventListener('click', e => {
    counter --; // decr counter (for checking slide pos)
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;

    // if prev clicked when on the first slide 
    if ((counter) == -1) {
        const lastSlide = slides[slidesLength - 1];
        const lastDot = dots[slidesLength - 1];
        counter = slidesLength - 1;  // set counter to last slide index
        track.style.transform = 'translateX(-' + totalWidth + ')'; // shift ul to the last slide
        currentSlide.classList.remove('current-slide'); // remove .current-slide CSS on current slide
        lastSlide.classList.add('current-slide'); // add .current-slide CSS on the last slide
        currentDot.classList.remove('current-slide');
        lastDot.classList.add('current-slide');
        
        slideResize(); // call resize function (shifts track correctly)

    } else {
        // not the first slide
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    }
});


// When next clicked, move to slide on the right
nextButton.addEventListener('click', e => {  // track the event (click)
    counter ++; // incr counter for tracking index pos
    const currentSlide = track.querySelector('.current-slide');  
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling;

    // if the next button is clicked when the current-slide is the last slide...
    if ((counter) == slidesLength) {
        const firstSlide = slides[0];
        const firstDot = dots[0];
        counter = 0;
        track.style.transform = 'translateX(-' + 0 + 'px' + ')'; // shift ul to first slide
        currentSlide.classList.remove('current-slide'); // remove .current-slide CSS on current slide
        firstSlide.classList.add('current-slide'); // add .current-slide CSS on the first slide

        currentDot.classList.remove('current-slide');
        firstDot.classList.add('current-slide');

    } else {
        // not the last slide...
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }
})

// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // which indicator was clicked on?
    const targetDot = e.target.closest('button'); // prevents event when carousel__nav clicked (not near carousel__nav buttons)
    if (!targetDot) return; // if !targetDot... exit function

    const currentSlide = track.querySelector('.current-slide');
    const currentDot  = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot); // get index of dot clicked on
    counter = targetIndex;
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})


// when window is resized --> get new carousel slide length and total width then reset track pos so that only the current slide is seen
window.addEventListener('resize', slideResize);

function slideResize(){
    var newSlideWidth = slides[0].getBoundingClientRect().width; // get size of the first slide (same for all slides),  get only width of the first slide
    var totalWidth = slideWidth * (slidesLength - 1) + 'px'; // get total length of all slides next to each other
    // arrange the slides next to one another
    // make a function
    const setSlidePosition = (slide, index) => { // reset slide positions for new window size
        slide.style.left = newSlideWidth * index + 'px';  // change style --> move slide from the left (shift from absolute pos.)
    }
    
    slides.forEach(setSlidePosition); // call function for each slide
    
    const currentSlide = track.querySelector('.current-slide');
    var currentIndex = slides.indexOf(currentSlide);
    var currentTrackPos = newSlideWidth * currentIndex + 'px';
    track.style.transform = 'translateX(-' + currentTrackPos + ')'; // shift ul
}    