"use strict";


var test_data = {},
	test_data_rating = {},
	blacklist = {}, 
	answer_order = [],
	get_answer = false,
	test_id = undefined,
	test_inverse_mode = undefined;




function init_test(json_data) {
	test_data = JSON.parse(json_data).data[0];
	blacklist = {};
	get_answer = false;

	if (test_inverse_mode == 1) {
		let new_test_data = {};
		for (let key in test_data) {
			new_test_data[test_data[key]] = key;
		}
		test_data = new_test_data;
	}

	for (let key in test_data) {
		test_data_rating[key] = 0;
	}

	$("#test-id").html("[ #" + test_id + " ]");
	reload_test();
}


function update_stat() {
	var test_fail = 0;
	for (let key in test_data) {
		if (test_data_rating[key] < 2) {
			test_fail += 1;
		}
	}
	$("#test-stat").html("[ Problems: " + test_fail.toString() + "/" + Object.keys(test_data).length + " ]");
}


function reload_test() {
	update_stat()

	var question = undefined;
	for (let element in blacklist) {
		blacklist[element] -= 1;
	}
	for (let element in blacklist) {
		if (blacklist[element] == 0) {
			delete blacklist[element];
		}
	}


	for (let key in test_data) {
		if (blacklist.hasOwnProperty(key)) {
			continue;
		}
		if (typeof question === "undefined" || test_data_rating[key] < test_data_rating[question]) {
			question = key;
		}
	}
	if (typeof question === "undefined") {
		question = rand_key(test_data);
	}

	var equal_rating_questions = [ question ];
	for (let key in test_data) {
		if (blacklist.hasOwnProperty(key)) {
			continue;
		}
		if (test_data_rating[key] === test_data_rating[question]) {
			equal_rating_questions.push(key);
		}
	}
	question = get_random_element(equal_rating_questions);
	blacklist[question] = 5;


	$("#question").html(question + "?");

	var possible_answers = [ test_data[question] ];

	var max_iterations = 100;
	while (max_iterations && possible_answers.length < 4) {
		max_iterations--;
		var new_answer = test_data[rand_key(test_data)];
		if (possible_answers.indexOf(new_answer) == -1) {
			possible_answers.push(new_answer);
		}
	}
	while (possible_answers.length < 4) {
		possible_answers.push("NO_AVAILABLE_ANSWER");
	}

	answer_order = [];
	for (let i = 0; i < 4; i++) {
		answer_order.push(get_random_element(possible_answers));
		$("#button" + i.toString()).html(answer_order[i]);
	}
	answer_order.push(question);
	answer_order.push(test_data[question]);
}


function play_test(button_id) {
	if (get_answer) {
		get_answer = false;

		for (let i = 0; i < 4; i++) {
			$("#answer" + i.toString()).removeClass("right-answer");
			$("#answer" + i.toString()).removeClass("wrong-answer");
		}

		reload_test();
		return;
	}

	let true_answer = answer_order.length - 1;
	let question = answer_order[answer_order.length - 2];

	if (answer_order[button_id] !== answer_order[true_answer]) {
		$("#answer" + button_id.toString()).addClass("wrong-answer");
		test_data_rating[question] -= 5;
	} else {
		test_data_rating[question] += 1;
	}
	for (let i = 0; i < 4; i++) {
		if (answer_order[i] == answer_order[true_answer]) {
			$("#answer" + i.toString()).addClass("right-answer");
		}
	}
	get_answer = true;
}

function get_random_element(init_array) {
	let pos = rand(0, init_array.length - 1);
	let value = init_array[pos];

	remove_element(init_array, pos);
	return value; 
}

function rand_key(dict) {
	let keys = Object.keys(dict);
	let key_number = rand(0, keys.length - 1);
	return keys[key_number];
}

function remove_element(init_array, pos) {
	return init_array.splice(pos, 1).length;
}

function rand(l, r) {
	return Math.floor(Math.random() * (r - l) + l);
}