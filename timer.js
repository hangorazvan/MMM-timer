/*	Magic Mirror 2
*	Module: Timer
*	by Razvan Cristea 
*	https://github.com/hangorazvan
*/

Module.register("timer", {
	defaults: {
		bodysize: 1080,		// Minimum window width
		sharpMode: true,	// hourly alert notification
		dateMode: true,		// specific date hourly custom notification
		fadeMode: true,		// fade to dimmed mode over night and back in the morning
		dimmMode: true,		// dimmed mode over night
		nightMode: true,	// zoomed night mode for iPad 3
		dimming: 40,		// dimming amount (default is 40% grayscale with 0.6 opacity but you can change to w.e.y.w. ex: 70% grayscale with 0.3 opacity)
		midnight: 24,		// midnight or custom timer start
		name1: "",			// Wife or girlfriend name
		birthday1: "",		// day & month
		name2: "",			// Husband or boyfriend name
		birthday2: "",		// day & month
		name3: "",			// Child or pet name
		birthday3: ""		// day & month
	},
	
	getScripts: function() {
		return ["moment.js"];
	},

	getTranslations: function() {
		return {en: "en.json", ro: "ro.json",};
	},

	start: function() {
		Log.info("Starting module: " + this.name); var self = this;

		setInterval(function() {
			var now = moment().format("k:mm:ss"); var hide = moment().format("ss");
			var date = moment().format("DD-MM mm:ss"); var dimm = moment().format("m");
			var grayscale = self.config.dimming; var opacity = (1-grayscale/100).toPrecision(2);
			var gray1 = (dimm * grayscale/60).toPrecision(4); var opac1 = (1-gray1/100).toPrecision(2); 
			var gray2 = (grayscale-gray1).toPrecision(4); var opac2 = (1-gray2/100).toPrecision(2);
			var midnight = self.config.midnight; var morning = midnight - 18;
			if (midnight <= 18) {morning = midnight + 6;} var winter = moment().format("MM");
			if ((winter >= "01" && winter <= "03") || (winter >= "11" && winter <= "12")) {morning = morning + 1;}
			var dqs1 = Array.from(document.querySelectorAll(".calendar, .dailly, .hourly, .rssnews, .swatch"));
			var dqs2 = Array.from(document.querySelectorAll(".wicon"));
			var dqs3 = Array.from(document.querySelectorAll(".ns-box"));
			var dqs4 = Array.from(document.querySelectorAll(".weather"));
			var dqs5 = Array.from(document.querySelectorAll(".pre-line"));
			var dqs6 = Array.from(document.querySelectorAll(".monthly"));
			var dqs7 = Array.from(document.querySelectorAll(".fullscreen.below"));
			var body = Array.from(document.querySelectorAll("body"));
			body.forEach(function(element) {return element.style["min-height"] =
			window.innerHeight / (window.innerWidth / self.config.bodysize) + "px",
			element.style["min-width"] = self.config.bodysize + "px";});

			if (self.config.sharpMode) {
				if ((now == "23:00:00") || (now == "24:00:00") || (now == "1:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Good night!")
					});
				} else if ((now == "2:00:00") || (now == "3:00:00") || (now == "4:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Sleep well!")
					});
				} else if ((now == "5:00:00") || (now == "6:00:00") || (now == "7:00:00") || (now == "8:00:00") || 
					(now == "9:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Good morning!")
					});
				} else if ((now == "12:00:00") || (now == "13:00:00") || (now == "14:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Bon appetit!")
					});
				} else if ((now == "15:00:00") || (now == "16:00:00") || (now == "17:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Have a nice day!")
					});
				} else if ((now == "18:00:00") || (now == "19:00:00") || (now == "20:00:00") || (now == "21:00:00") || (now == "22:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Have a nice evening!")
					});
				}
			}

			if (self.config.dateMode) { 
				if ((date == "25-12 00:06") || (date == "26-12 00:06")) {
					self.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
						title: "<i class='fa fa-gifts yellow'></i> " + self.translate("Marry Christmas!"),
						message: self.translate("Happy holidays with many joys!")
					});
				} else if ((date == "01-01 00:06") || (date == "02-01 00:06")) {
					self.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
						title: "<i class='fa fa-glass-cheers yellow'></i> " + self.translate("Happy Birthday ") + moment().format("YYYY") + "!", 
						message: self.translate("A new year as good as possible and good health!")
					});
				} else if (date == "14-02 00:06") {
					self.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
						title: "<i class='far fa-heart redrf'></i> " + self.translate("Happy Valentine's Day!"),
						message: self.translate("Happy Valentine's and much happiness!")
					});
				} else if (date == self.config.Birthday1 + " 00:06") {
					self.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
						title: "<i class='fa fa-birthday-cake yellow'></i> " + self.translate("Happy Birthday, ") + self.config.Name1, 
						message: self.translate("Good health and be happy! F")
					});
				} else if (date == self.config.Birthday2 + " 00:06") {
					self.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
						title: "<i class='fa fa-birthday-cake yellow'></i> " + self.translate("Happy Birthday, ") + self.config.Name2, 
						message: self.translate("Good health and be happy! M")
					});
				} else if (date == self.config.Birthday3 + " 00:06") {
					self.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
						title: "<i class='fa fa-birthday-cake yellow'></i> " + self.translate("Happy Birthday, ") + self.config.Name3, 
						message: self.translate("Good health and be happy! M")
					});
				}
			}

			if (hide == "59") {
				dqs3.forEach(function(element) {element.style.display = "none";});
			}

			if (window.innerWidth < self.config.bodysize) {
				body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";});

				if (self.config.nightMode) { if (now >= midnight.toString() + ":00:00" && now < morning.toString() + ":00:00") {
						body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize * 1.55 + ")";});
						dqs1.forEach(function(element) {element.style.display = "none";});
						dqs2.forEach(function(element) {element.style.float = "right";});
						dqs4.forEach(function(element) {return element.style.transform = "translate(-720px, 270px)", element.style["text-align"] = "left";});
						dqs5.forEach(function(element) {return element.style.position = "absolute", element.style.transform = "translate(-300px, -400px) scale(0.45)", element.style.width = "600px";});
						dqs6.forEach(function(element) {element.style.display = "none";});
					} else { recursive();
						body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";});
					}
				}
			} else { recursive();
				body.forEach(function(element) {element.style.transform = "scale(1)";});
			}

			function recursive(){
				dqs1.forEach(function(element) {element.style.display = "inherit";});
				dqs2.forEach(function(element) {element.style.float = "left";});
				dqs4.forEach(function(element) {return element.style.transform = "translate(0, 0)", element.style["text-align"] = "inherit";});
				dqs5.forEach(function(element) {return element.style.position = "inherit", element.style.transform = "scale(1)", element.style.width = "inherit";});
				dqs6.forEach(function(element) {element.style.display = "table";});                
			}

			if (self.config.dimmMode) {
				if (self.config.fadeMode) {
					if (now >= (midnight-1).toString() + ":00:00" && now < midnight.toString() + ":00:00") {
						body.forEach(function(element) {return element.style.opacity = opac1, element.style.filter = "grayscale(" + gray1 + "%)";});
					} else if (now >= midnight.toString() + ":00:00" && now < morning.toString() + ":00:00") {
						body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)";});
					} else if (now >= morning.toString() + ":00:00" && now < (morning+1).toString() + ":00:00") {
						body.forEach(function(element) {return element.style.opacity = opac2, element.style.filter = "grayscale(" + gray2 + "%)";});
					} else {
						body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
					}
				} else { if (now >= midnight.toString() + ":00:00" && now < morning.toString() + ":00:00") {
						body.forEach(function(element) {return element.style.opacity = opacity, element.style.filter = "grayscale(" + grayscale + "%)"});
					} else {
						body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
					}
				}
			}
		},1000);
	},
});