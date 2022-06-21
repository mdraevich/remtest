"use strict";


function startup() {
	$(".ajax-content").load("./html_data/startup.html", function(response_text, status_text, xhr) {
		if(status_text === "success") {
			toggle_navbar();
			toggle_active();
		}	
	});
}


function upload_file() {
	var new_pack = document.getElementById("upload-pack").files[0];
	document.getElementById("upload-pack").value = "";

	if (typeof new_pack === "undefined") {
		$("#upload-pack-verdict").html("Error: no pack to send!")
		return;
	}
	if (!new_pack.name.endsWith(".json")) {
		$("#upload-pack-verdict").html("Error: invalid file format!")
		return;
	}
	if (new_pack.size >= 50000) {
		$("#upload-pack-verdict").html("Error: pack is too large to send!")
		return;
	}
	var fdata = new FormData();
	fdata.append("test-file", new_pack);

	$.ajax({
		url: "server/upload_test",
		type: "POST",
		data: fdata,
		processData: false,
		contentType: false,
		beforeSend: function() {
			$("#upload-pack-verdict").html("Status: sending test-file...");
		},
		success: function(response) {
			console.log(response);
			$("#upload-pack-verdict").html("Status: uploaded! Test ID: #" + response);
		},
		error: function() {
			$("#upload-pack-verdict").html("Error: can't send test-file!");
		}
	});
}


function popular() {
	make_search("#popular");
	toggle_navbar();
	toggle_active("#popular");
}


function add_pack() {
	$(".ajax-content").load("./html_data/add_pack.html", function(response_text, status_text, xhr) {
		if(status_text === "success") {
			toggle_navbar();
			toggle_active("#add_pack");
		}	
 	});
}


function about() {
	$(".ajax-content").load("./html_data/about.html", function(response_text, status_text, xhr) {
		if(status_text === "success") {
			toggle_navbar();
			toggle_active("#about");
		}	
	});
}


function start_test(element_id) {
	load_test(element_id.dataset.id, 0);
}

function inverse_test() {
	if (test_inverse_mode == 0) {
		test_inverse_mode = 1;
	} else {
		test_inverse_mode = 0;
	}
	load_test(test_id, test_inverse_mode);
}


function load_test(_test_id, _inverse_mode) {

	$(".ajax-content").load("./html_data/test.html", function(response_text, status_text, xhr) {
		if(status_text === "success") {
			$.ajax({
				url: "server/loadtest",
				type: "GET",
				data: {
					id: _test_id.toString(),
				},
				success: function(response) {
					test_inverse_mode = _inverse_mode;
					test_id = _test_id;

					footer_move();
					toggle_navbar();
					toggle_active();
					init_test(response);
				}
			});
		}		
	});

}


function make_search(search_value) {
	if (typeof search_value === "undefined") {
		var search_value = $("input.form-control").val();
	}
	$("input.form-control").val("");

	if (search_value.length > 0) {
		$.ajax({
			url: "server/search",
			type: "GET",
			data: {
				key: search_value.toString()
			},
			success: function(response) {
				$("div.ajax-content").html(response);
				footer_move();
			}
		});
	}
	toggle_navbar();
	toggle_active();
}



function toggle_navbar() {
	$('#navbarMenu').collapse('hide');
}
function toggle_active(active_id) {
	$("#add_pack").removeClass("active");
	$("#popular").removeClass("active");
	$("#about").removeClass("active");
	if (typeof active_id !== "undefined") {
		$(active_id).addClass("active");
	}

	footer_move();
}