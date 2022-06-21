"use strict";


function footer_move() {

	var client_height = document.documentElement.clientHeight,
		content_height = $("div.full-content").height()
						+ parseFloat($("div.full-content").css("margin-top"));
	content_height += 80;

	if (content_height <= client_height) {
		$("div.footer-copyright").addClass("fixed-bottom")
	} else {
		$("div.footer-copyright").removeClass("fixed-bottom")
	}
}