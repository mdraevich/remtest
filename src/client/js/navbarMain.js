"use strict";


var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    var navbar = document.getElementById("navbarMain");

    if (navbar.style.top.length == 0) {
        navbar.style.top = "0px";
    }
    var cur_top = parseInt(navbar.style.top);
    var hide_speed = navbar.offsetHeight / 20;

    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = Math.min(0, cur_top + hide_speed * 2).toString() + "px";
    } else {
        navbar.style.top = Math.max(cur_top - hide_speed, -navbar.offsetHeight-1).toString() + "px";
    }

    if (currentScrollPos == 0) {
        navbar.style.top = "0px";
    }

    prevScrollpos = currentScrollPos;
} 

window.onload = function() {

  	var navbar = document.getElementById("navbarMain");
    $("div.full-content").css("margin-top", (navbar.offsetHeight * 1.2).toString() + "px");
    
    startup();

    $("form.form-inline").submit(function (e) {
        e.preventDefault();
        make_search();
    });
}

window.onresize = function(event) {
    footer_move();
};
