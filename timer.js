/* Magic Mirror
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 *
 * https://github.com/hangorazvan
 * Creative Commons BY-NC-SA 4.0, Romania.
 */
Module.register("timer", {
	defaults: {
		debugging: false
	},
	
//	getScripts: function() {
//	return ["moment.js"];
//	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		setInterval(function() {
			self.timer();
		}, 1000);
	},

	timer: function() {
		var self = this; var now = moment().format("HH:mm:ss");
		var midnight = moment().startOf("d").format("HH:mm:ss");
		var morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
		var winter = moment().format("M");
		if ((winter >= "1" && winter <= "3") || (winter >= "11" && winter <= "12")) {
			morning = morning + 1;
		}

		if (self.config.debugging!==false) {
			midnight = moment().startOf("d").add(self.config.debugging,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(self.config.debugging + 6,"h").format("HH:mm:ss");
			Log.log("Midnight " + midnight + " Morning " + morning);
		}

		var hide = Array.from(document.querySelectorAll(".module:not(.clock):not(.weather):not(.compliments):not(.swatch)"));
		var wicon = Array.from(document.querySelectorAll(".wicon"));
		var wthr = Array.from(document.querySelectorAll(".weather"));
		var comp = Array.from(document.querySelectorAll(".pre-line"));
		var mcal = Array.from(document.querySelectorAll(".monthly"));
		var body = Array.from(document.querySelectorAll("body"));

		body.forEach(function(element) {
			return element.style["min-height"] = window.innerHeight / (window.innerWidth / self.config.bodysize) + "px",
			element.style["min-width"] = self.config.bodysize + "px";
		});

		if (window.innerWidth < self.config.bodysize) { day_mode();
			body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";});

			if (self.config.nightMode) { if (now >= midnight && now < morning) { night_mode();
					body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize * 1.55 + ")";});
				} else { day_mode();
					body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";});
				}
			}
		} else { day_mode();
			body.forEach(function(element) {element.style.transform = "scale(1)";});
		}


		function day_mode() {
			hide.forEach(function(element) {element.style.display = "inherit";});
			wicon.forEach(function(element) {element.style.float = "left";});
			wthr.forEach(function(element) {return element.style.transform = "translate(0, 0)", element.style["text-align"] = "inherit";});
			comp.forEach(function(element) {return element.style.position = "inherit", element.style.transform = "scale(1)", element.style.width = "inherit";});
			mcal.forEach(function(element) {element.style.display = "table";});
		}

		function night_mode() {
			hide.forEach(function(element) {element.style.display = "none";});
			wicon.forEach(function(element) {element.style.float = "right";});
			wthr.forEach(function(element) {return element.style.transform = "translate(-720px, 295px)",element.style["text-align"] = "left";});
			comp.forEach(function(element) {return element.style.position = "absolute",
				element.style.transform = "translate(-300px, -400px) scale(0.45)", element.style.width = "600px";});
			mcal.forEach(function(element) {element.style.display = "none";});
		}
	},
});