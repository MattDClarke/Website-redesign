// Modified from: https://www.w3schools.com/howto/howto_js_filter_lists.asp

function searchFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
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
      
      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) { // if it is true
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }    
    }
  }

  
  document.getElementById('searchInput').addEventListener('keyup', searchFilter);
  