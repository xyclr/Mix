define(function(require, exports, module) {

	var $ = require('jquery');

	var header = $("#header")[0];
	
	header.innerHTML = "Grunt Seajs Demo";

	console.log("js/common/head.js loaded");
});