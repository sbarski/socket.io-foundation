/* global $, io */

var game = (function () {

	var id, socket;

	var S4 = function() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	var guid = function() {
	   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	var init = function() {

		socket = io.connect('http://localhost:8080');

		socket.on("throw", function(data) {
			console.log("received: ",data);
			if (data.id !== id) {
				console.log("pitch received from another player!");
				$("<div/>").text(data.throw).prependTo("#output");
			}
		});

	}

	$(function() {

		init();

		id = guid();

		$("body").delegate("button","click", function(e) {
			socket.emit("throw",{
				throw: $(this).text(),
				id: id
			});
		});

	});

})();