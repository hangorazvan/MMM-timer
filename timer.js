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
		debugging: 12
	},
	
//	getScripts: function() {
//		return ["moment.js"];
//	},

	start: function() {
		Log.info("Starting module: " + this.name);
	},

	timer: function() {
		var self = this; var now = moment().format("HH:mm:ss");
		var body = Array.from(document.querySelectorAll("body"));

		if (self.config.debugging!==false) {
			midnight = moment().startOf("d").add(self.config.debugging,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(self.config.debugging + 6,"h").format("HH:mm:ss");
			Log.log("Midnight " + midnight + " Morning " + morning);
		} else { var winter = moment().format("M");
			midnight = moment().startOf("d").format("HH:mm:ss");
			morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
			if ((winter >= "1" && winter <= "3") || (winter >= "11" && winter <= "12")) {
				morning = morning + 1;}
		}

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

		function day_mode() { self.sendNotification("CHANGE_POSITIONS_DEFAULTS")
			MM.getModules().withClass(self.config.day_modules).exceptWithClass(self.config.except_modules).enumerate(function(module) {
				module.show(config.animation, { lockString: self.identifier });
			});
		}

		function night_mode() {
			self.sendNotification("CHANGE_POSITIONS",
			modules = {
				'weather':{visible: 'true',	position: 'top_left'},
				'compliments':{visible: 'true', position: 'top_center'},
				'calendar':{visible: 'false', position: 'bottom_left'},
				'_calendar':{visible: 'false', position: 'bottom_left'},
				'lifecounter':{visible: 'false', position: 'bottom_left'},
				'monthly':{visible: 'false', position: 'bottom_center'},
				}
			);
			MM.getModules().withClass(self.config.day_modules).exceptWithClass(self.config.except_modules).enumerate(function(module) {
				module.hide(config.animation, { lockString: self.identifier });
			});
		}
	},

	notificationReceived: function (notification, payload, sender) {
		var self = this;
		if (notification === "DOM_OBJECTS_CREATED") {
//		if (notification === "ALL_MODULES_STARTED") {
			setTimeout(function() {
				setInterval(function() {
					self.timer();
				},1000);
			},10000);
		}
	}
});