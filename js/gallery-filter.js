// modified from https://www.w3schools.com/howto/howto_js_portfolio_filter.asp

filterSelection("all") // default value - run when page loads (display: none for grid-cards...)
 // Execute the function (called when one of the filter buttons is clicked)
function filterSelection(c) { 
  var x, i;
  x = document.getElementsByClassName("grid-card"); // get all image thumbnails - store group as a variable (returns an array)
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) { // loop through gallery (go through each thumbnail) with particular filter
    // remove the "show" class from all img thumbnails
    w3RemoveClass(x[i], "show");
    // Add the "show" class (display:block) to the filtered elements
    // .indexOf returns the pos of first occurences of a specified val in a string. Returns -1 if no occurence
    // e.g. if venomous filter button is clicked, c=venomous --> if thumbnail has venomous class then show class will be added
    // index of c will be > -1 if present... add show class to venomous thumbnails
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show"); // if c = "all" --> c="" --> .indexOf > -1 ... add show to all thumbnails
  }
}


// Show filtered elements
function w3AddClass(element, name) { // HTML element and CSS class targeted e.g. if venomous filter btn clicked --> thumbnail with venomous class --> add show class
  var i, arr1, arr2;
  // .split() changes strings into an array (in this case space separated strings --> array)
  arr1 = element.className.split(" "); // saves an array listing all CSS classes that a thumbnail element has (classes are listed with white spaces inbetween them) class="grid-card venomous" --> ["grid-card", "venomous"]
  // name = "show"
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) { 
    // .indexOf() returns pos of first occurance of string ("class="show") (-1 returned if no occurence)
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];} // add class ="show"
  }
}


// Hide elements that are not selected (do for each thumbnail with class = grid-card)
function w3RemoveClass(element, name) { // img thumbnail (class= grid-card), name ="show"
  var i, arr1, arr2;
  arr1 = element.className.split(" "); // eg. ["grid-card", "venomous"]
  arr2 = name.split(" "); // eg. class= "show" --> ["show"]
  for (i = 0; i < arr2.length; i++) { // if show class is not present on a particular grid-card then it wnt loop...
    while (arr1.indexOf(arr2[i]) > -1) { // while there is an occurence of show class
      arr1.splice(arr1.indexOf(arr2[i]), 1);   // at position arr1.indexOf(arr2[i])  remove 1 item --> remove show class...
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var galleryFilters = document.getElementById("gallery-filters");
var filters = galleryFilters.getElementsByClassName("gallery-filter");
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("gallery-filter-active");
    current[0].className = current[0].className.replace(" gallery-filter-active", ""); // remove active class from previously clicked btn
    this.className += " gallery-filter-active"; // add active class to recently clicked btn
  });
}


// call function when filter btn clicked
document.getElementById('gallery-filter-show-all').addEventListener("click", function() {
    filterSelection("all");
});

document.getElementById('gallery-filter-venomous').addEventListener("click", function() {
    filterSelection("venomous");
});

document.getElementById('gallery-filter-nonVenomous').addEventListener("click", function() {
    filterSelection("nonVenomous");
});

document.getElementById('gallery-filter-taipei').addEventListener("click", function() {
  filterSelection("taipei");
});

document.getElementById('gallery-filter-common').addEventListener("click", function() {
  filterSelection("common");
});

document.getElementById('gallery-filter-endemic').addEventListener("click", function() {
  filterSelection("endemic");
});