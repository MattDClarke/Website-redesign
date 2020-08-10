const body = document.querySelector('body');
const mainContent = document.querySelector('.main-content');
const mainCover = document.querySelector('.main-cover');
const burger = document.querySelector('.burger');
const navUl = document.querySelector('#navUl');
const navLinks = document.querySelectorAll('.nav-links li');

const searchInput = document.querySelector('#searchInput');
const searchIcon = document.querySelector('#search-btn');
const closeBtnSearch = document.querySelector('#search-close');

// ---------------------------------------------- Nav toggle ---------------------------------------------------------//

// ----------------------------------------- nav search list  ------------------------------------------------------//

// Modified from: https://www.w3schools.com/howto/howto_js_filter_lists.asp

function searchFilter() {
  // Declare variables
  // const main = document.querySelector('main');
  const filter = searchInput.value.toUpperCase(); // user input
  const ul = document.querySelector('#searchUL');
  const li = ul.getElementsByTagName('li');

  if (searchInput.value === '') {
    ul.style.display = 'none';
  } else {
    ul.style.display = 'block';

    // Loop through all list items, and hide those that don't match the search query
    for (let i = 0; i < li.length; i += 1) {
      const a = li[i].getElementsByTagName('a')[0];
      const txtValue = a.innerText; // text of each list item (common and scientific name)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        // if it is true (the substring {user input} occurs in the list item {name or scientific name})
        li[i].style.display = 'block';
      } else {
        li[i].style.display = 'none';
      }
    }
  }
}

const navSlide = () => {
  // close search input (if open)

  burger.addEventListener('click', () => {
    // close search input (if open)... same effect as clicking close for search box
    closeBtnSearch.style.display = 'none';
    searchIcon.style.display = 'block';
    searchInput.style.height = '0';
    searchInput.value = ''; // clear input
    searchFilter(); // to make UL display = none. (if user closes search when there are search results displayed)

    // toggle nav
    navUl.classList.toggle('nav-active');

    if (navUl.classList.contains('nav-active')) {
      navUl.style.animation = 'navSwipeOpen 0.5s ease-in';
    } else {
      navUl.style.animation = 'navSwipeClose 0.5s ease-in';
    }

    // animate Links
    navLinks.forEach((link, index) => {
      // if link has animation on it..
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        // must use back tick "`"
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.3}s`;
      }
    });

    // burger animation
    burger.classList.toggle('close');

    // add opacity to main content
    mainContent.classList.toggle('background-fade');
    mainCover.classList.toggle('main-cover-opened');
    // remove scroll
    body.classList.toggle('remove-scroll');
  });
};

// call function
navSlide();

// check window size, if it is larger than 1000px, remove nav-active class from nav ul
// remove blur and close nav function
function removeBlurAndClose() {
  if (window.innerWidth > 1000) {
    navUl.classList.remove('nav-active');
    mainContent.classList.remove('background-fade');
    mainCover.classList.remove('main-cover-opened');
    body.classList.remove('remove-scroll');
    burger.classList.remove('close');
    navUl.style.animation = `navSwipeClose 0.5s ease-in`;
    // remove links style
    navLinks.forEach(link => {
      link.style.animation = '';
    });
  }
}

// close nav drop down when user clicks outside of nav (if nav-active)
function exitNav() {
  if (
    window.innerWidth <= 1000 &&
    navUl.classList.contains('nav-active') === true
  ) {
    navUl.classList.remove('nav-active');
    mainContent.classList.remove('background-fade');
    mainCover.classList.remove('main-cover-opened');
    body.classList.remove('remove-scroll');
    burger.classList.remove('close');
    navUl.style.animation = `navSwipeClose 0.5s ease-in`;

    // remove links style
    navLinks.forEach(link => {
      link.style.animation = '';
    });
  }
}

// Listen for main content click
mainCover.addEventListener('click', exitNav);

// on window resize, call the remove blur and close nav function
window.onresize = removeBlurAndClose;

// ------------------------------------------------- nav search  --------------------------------------------------------------//

let count = 0;
const message = 'Search for a species';
const speed = 100;

function typeWriter() {
  if (count < message.length) {
    const msg = searchInput.getAttribute('placeholder') + message.charAt(count);
    searchInput.setAttribute('placeholder', msg);
    count += 1;
    setTimeout(typeWriter, speed);
  }
}

searchIcon.addEventListener('click', () => {
  searchIcon.style.display = 'none';
  closeBtnSearch.style.display = 'block';
  searchInput.style.height = '40px';
  searchInput.style.cursor = 'text';
  searchInput.focus();

  typeWriter();
});

closeBtnSearch.addEventListener('click', () => {
  closeBtnSearch.style.display = 'none';
  searchIcon.style.display = 'block';
  searchInput.style.height = '0';
  searchInput.value = ''; // clear input
  searchFilter(); // to make UL display = none. (if user closes search when there are search results displayed)
});

document.querySelector('#searchInput').addEventListener('keyup', searchFilter);
