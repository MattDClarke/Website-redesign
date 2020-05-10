//---------------------------------------------- Nav toggle ---------------------------------------------------------//
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  const mainContent = document.querySelector('.main-content');
  
  burger.addEventListener('click',()=> {
    
    // toggle nav
    nav.classList.toggle('nav-active');

    // animate Links
    navLinks.forEach((link, index)=> {
      // if link has animation on it..
      if(link.style.animation){
        link.style.animation = ''  
      } else {
        // must use back tick "`"
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
    
    // burger animation
    burger.classList.toggle('close');
    
    // add opacity to main content
    mainContent.classList.toggle('background-fade')
  });  
}


// call function
navSlide();



// check window size, if it is larger than 850px, remove nav-active class from nav ul
const mainContent = document.querySelector('.main-content');
const navUl = document.getElementById("navUl");
const burger = document.querySelector('.burger');
const navLinks = document.querySelectorAll('.nav-links li');

// remove blur and close nav function
function removeBlurAndClose() {
if (window.innerWidth > 850) {
  navUl.classList.remove("nav-active");
  mainContent.classList.remove('background-fade')
  burger.classList.remove('close');

  // remove links style
  navLinks.forEach((link, index)=> {
      link.style.animation = ''  
    });
}
}


// close nav drop down when user clicks outside of nav (if nav-active)
function exitNav() {
if (window.innerWidth <= 850 && navUl.classList.contains("nav-active") == true) {
  navUl.classList.remove("nav-active");
  mainContent.classList.remove('background-fade')
  burger.classList.remove('close');

  // remove links style
  navLinks.forEach((link, index)=> {
      link.style.animation = ''  
    });
  }
}


// Listen for main content click 
mainContent.addEventListener('click',exitNav);

// on window resize, call the remove blur and close nav function
window.onresize = removeBlurAndClose;


//-------------------------------------------------- nav search  --------------------------------------------------------------//

const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('searchInput');

// close btn
const closeBtnSearch = document.getElementById('search-close');

var i = 0;
var message = 'Search for a species'
var speed = 100;

searchIcon.addEventListener('click', () => {
searchIcon.style.display = 'none';
closeBtnSearch.style.display = 'block';
searchInput.style.height = '40px';
searchInput.style.cursor = 'text';
searchInput.focus();

typeWriter();

})

closeBtnSearch.addEventListener('click', () => {
closeBtnSearch.style.display = 'none';
searchIcon.style.display = 'block';
searchInput.style.height = '0';
searchInput.value = ''; // clear input
searchFilter(); // to make UL display = none. (if user closes search when there are search results displayed)

})


function typeWriter() {
if (i < message.length) {
  msg = searchInput.getAttribute('placeholder') + message.charAt(i);
  searchInput.setAttribute('placeholder', msg);
  i++;
  setTimeout(typeWriter, speed);
}
}


//------------------------------------------------ nav search list  -------------------------------------------------------------//

// Modified from: https://www.w3schools.com/howto/howto_js_filter_lists.asp

function searchFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase(); // user input
    ul = document.getElementById("searchUL");
    li = ul.getElementsByTagName('li');
    main = document.querySelector("main");
    form = document.getElementById('nav-search-form');
    
    if (input.value == "") {
      ul.style.display = "none";
      main.style.opacity = "1";
    } else {
      ul.style.display = "block";
      main.style.opacity = "0";
      
      // Loop through all list items, and hide those that don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.innerText; // text of each list item (common and scientific name)
        if (txtValue.toUpperCase().indexOf(filter) > -1) { // if it is true (the substring {user input} occurs in the list item {name or scientific name})
          li[i].style.display = "block";
        } else {
          li[i].style.display = "none";
        }
      }    
    }
  }

  
  document.getElementById('searchInput').addEventListener('keyup', searchFilter);
  