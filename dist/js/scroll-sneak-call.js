// SCROLL SNEAK JS: you can change `location.hostname` to any unique string or leave it as is -->

(function() {
    var sneaky = new ScrollSneak(location.hostname), tabs = document.getElementById('searchUL').getElementsByTagName('li'), i = 0, len = tabs.length;
    for (; i < len; i++) {
        tabs[i].onclick = sneaky.sneak;
    }

    var sneaky = new ScrollSneak(location.hostname), tabs = document.getElementById('navUl').getElementsByTagName('li'), i = 0, len = tabs.length;
    for (; i < len; i++) {
        tabs[i].onclick = sneaky.sneak;
    }
    
   
})();

