define(function(require, exports, module) {

	require('../../common/head');
	var util = require('../src/util'),
		$ = require('jquery');
	setInterval(function() {
		$('#box').css('background-color',util.randomColor());
	}, 1500);

	console.log("js/hellosea/src/hellosea.js loaded");
});