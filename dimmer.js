/* Magic Mirror
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 *
 * https://github.com/hangorazvan
 * Creative Commons BY-NC-SA 4.0, Romania.
 */
Module.register("dimmer", {
	defaults: {
		debugging: false
	},
	
//	getScripts: function() {
//		return ["moment.js"];
//	},

	start: function() {
		Log.info("Starting module: " + this.name);
	},

	notificationReceived: function(notification, payload, sender) {
		if (notification === "CLOCK_SECOND") {
			this.dimmer();
		}
	},

	dimmer: function() {
		var now = moment().format("HH:mm:ss");
		var secs = moment().format("s");
		var mins = moment().format("m");
		var grayscale = this.config.dimming;
		var opacity = (1-grayscale/100).toPrecision(2);
		var gray1 = (mins*grayscale/60).toPrecision(4);
		var opac1 = (1-gray1/100).toPrecision(2);
		var gray2 = (grayscale-gray1).toPrecision(4);
		var opac2 = (1-gray2/100).toPrecision(2);
		var body = Array.from(document.querySelectorAll("body"));

		if (this.config.debugging!==false) {
			night=midnight=moment().startOf("d").add(this.config.debugging,"h").format("HH:mm:ss");
			before = moment().startOf("d").add(this.config.debugging - 1,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(this.config.debugging + 6,"h").format("HH:mm:ss");
			after = moment().startOf("d").add(this.config.debugging + 7,"h").format("HH:mm:ss");
			gray1 = (secs*(grayscale/60)/1).toPrecision(2); opac1 = ((1-gray1/100)/1).toPrecision(2);
			gray2 = ((grayscale-gray1)/1).toPrecision(2); opac2 = ((1-gray2/100)/1).toPrecision(2);
			Log.log("Night "+night+" Midnight "+midnight+" Before "+before+" Morning "+morning+" After "+after);
			Log.log("Opacity 1: "+opac1+", Grayscale 1: "+gray1+", Opacity 2: "+opac2+", Grayscale 2: "+gray2);
		} else { var winter = moment().format("M");
			night = moment().endOf("d").format("HH:mm:ss");
			midnight = moment().startOf("d").format("HH:mm:ss");
			before = moment().startOf("d").subtract(1,"h").format("HH:mm:ss");
			morning = moment().startOf("d").add(6,"h").format("HH:mm:ss");
			after = moment().startOf("d").add(7,"h").format("HH:mm:ss");
			if ((winter >= "1" && winter <= "3") || (winter >= "11" && winter <= "12")) {
				morning = morning + 1; after = after + 1;}
		}

		if (this.config.dimmMode) {
			if (this.config.fadeMode) {
				if (now >= before && now < night) {
					body.forEach(function(element) {return element.style.opacity = opac1, element.style.filter = "grayscale(" + gray1 + "%)";});
				} else if (now >= midnight && now < morning) {
					body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)";});
				} else if (now >= morning && now < after) {
					body.forEach(function(element) {return element.style.opacity = opac2, element.style.filter = "grayscale(" + gray2 + "%)";});
				} else {
					body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
				}
			} else { if (now >= midnight && now < morning) {
					body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)";});
				} else {
					body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
				}
			}
		}
	},
});