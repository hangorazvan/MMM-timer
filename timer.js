/*	Magic Mirror 2
*	Module: Timer
*	by Razvan Cristea 
*	https://github.com/hangorazvan
*/

Module.register("timer", {
	defaults: {
		SharpMode: true,		// hourly alert notification
		DateMode: true,			// specific date hourly alert notification
		FadeMode: true,			// fade to dimmed mode over night and back in the morning
		DimMode: true,			// dimmed mode over night
		NightMode: true,		// zoomed night mode for iPad 3
		Background: false,		// background image set for .fullscreen.below in css file
		Reload: false,			// reload page
		Reinit: false,			// reinitialised MM
		FirstPoint: "23",		// time of fade start increase
		SecondPoint: "00",		// time of fade stop increase and night mode start
		ThirdPoint: "06",		// time of fade start decrease and day mode start
		ForthPoint: "07",		// time of fade mode stop decrease
		FifthPoint: "22",		// time of day mode stop
		Name1: "Paula!",		// Wife or girlfriend name
		Birthday1: "22-08",		// day & month
		Name2: "Răzvan!",		// Husband or boyfriend name
		Birthday2: "13-10",		// day & month
		Name3: "",			// child or pet name
		Birthday3: "",			// day & month
	},
	
	getTranslations: function() {
		return {
			en: "en.json",
			ro: "ro.json",
		};
	},

	start: function() {
		Log.info("Starting module: " + this.name); var self = this;

		setInterval(function() {
			var now = moment().format("HH:mm:ss"); var hide = moment().format("ss");
			var gray1 = moment().format("m")*0.83333333333333;
			var opac1 = 1-(gray1-1)/100; var gray2 = 50-gray1; 
			var opac2 = 0.5+gray1/100; var date = moment().format("DD-MM mm:ss");
			var dqs1 = Array.from(document.querySelectorAll(".calendar, .dailly, .rssnews"));
			var dqs2 = Array.from(document.querySelectorAll(".wicon"));
			var dqs3 = Array.from(document.querySelectorAll(".wtemp"));
			var dqs4 = Array.from(document.querySelectorAll(".weather"));
			var dqs5 = Array.from(document.querySelectorAll(".pre-line"));
			var dqs6 = Array.from(document.querySelectorAll(".monthly"));
			var dqs7 = Array.from(document.querySelectorAll(".fullscreen.below"));
			var body = Array.from(document.querySelectorAll("body")); var bodysize = 1080;
			body.forEach(function(element) {element.style["min-width"] = bodysize + "px";});

			if (self.config.Reload) {
				if (now == self.config.SecondPoint) {
					location.reload();
				}
			}

			if (self.config.Reinit) {
				if (now == self.config.SecondPoint) {
					MM.init();
				}
			}

			if (self.config.SharpMode) {
				if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Good night!")
					});
				} else if ((now == "02:00:00") || (now == "03:00:00") || (now == "04:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Sleep well!")
					});
				} else if ((now == "05:00:00") || (now == "06:00:00") || (now == "07:00:00") || (now == "08:00:00") || (now == "09:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Good morning!")
					});
				} else if ((now == "12:00:00") || (now == "13:00:00") || (now == "14:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Bon appetit!")
					});
				} else if ((now == "15:00:00") || (now == "16:00:00") || (now == "17:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Have a nice day!")
					});
				} else if ((now == "18:00:00") || (now == "19:00:00") || (now == "20:00:00") || (now == "21:00:00") || (now == "22:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class=\"far fa-bell lime\"></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Have a nice evening!")
					});
				}
			}

			if (self.config.DateMode) { 
				if ((date == "25-12 00:06") || (date == "26-12 00:06")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 9000, title: "<i class=\"fa fa-gifts yellow\"></i> " + self.translate("Crăciun fericit!"),
						message: self.translate("Happy holidays with many joys!")
					});
				} else if ((date == "01-01 00:06") || (date == "02-01 00:06")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 9000, title: "<i class=\"fa fa-glass-cheers yellow\"></i> " + self.translate("La mulți ani ") + moment().format("YYYY") + "!",
						message: self.translate("A new year as good as possible and good health!")
					});
				} else if (date == "14-02 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 9000, title: "<i class=\"far fa-heart redrf\"></i> " + self.translate("Happy Valentine's Day!"),
						message: self.translate("Happy Valentine's and much happiness!")
					});
				} else if (date == self.config.Birthday1 + " 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 9000, title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + self.translate("La mulți ani, ") + self.config.Name1,
						message: self.translate("Good health and be happy! [F]")
					});
				} else if (date == self.config.Birthday2 + " 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 9000, title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + self.translate("La mulți ani, ") + self.config.Name2,
						message: self.translate("Good health and be happy! [M]")
					});
				} else if (date == self.config.Birthday3 + " 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 9000, title: "<i class=\"fa fa-birthday-cake yellow\"></i> " + self.translate("La mulți ani, ") + self.config.Name3,
						message: self.translate("Good health and be happy! [M]")
					});
				}
			}
			
			if ((hide == "16") || (hide == "31") || (hide == "46")) {
				self.sendNotification("HIDE_ALERT");
			}

			if (self.config.NightMode) {
				if (window.innerWidth < bodysize) {
					if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":00:00") {
						body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / bodysize * 1.55 + ")";});
						dqs1.forEach(function(element) {element.style.display = "none";});
						dqs2.forEach(function(element) {element.style.float = "right";});
						dqs3.forEach(function(element) {element.style["margin-left"] = "-25px";});
						dqs4.forEach(function(element) {return element.style.position = "relative", element.style.left = "-750px",
						element.style.top = "280px", element.style["text-align"] = "left";});
						dqs5.forEach(function(element) {return element.style.position = "relative",
						element.style.left = "395px", element.style.top = "-180px", element.style["font-size"] = "3.5rem",
						element.style["line-height"] = "4rem", element.style.width = "300px";});
						dqs6.forEach(function(element) {element.style.display = "none";});
					} else if (now >= self.config.ThirdPoint + ":00:01" && now < self.config.FirstPoint + ":59:59") {
						body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / bodysize + ")";});
						dqs1.forEach(function(element) {element.style.display = "initial";});
						dqs2.forEach(function(element) {element.style.float = "left";});
						dqs3.forEach(function(element) {element.style["margin-left"] = "initial";});
						dqs4.forEach(function(element) {return element.style.position = "initial", element.style.left = "initial",
						element.style.top = "initial", element.style["text-align"] = "right";});
						dqs5.forEach(function(element) {return element.style.position = "initial",
						element.style.left = "initial", element.style.top = "initial", element.style["font-size"] = "6.4rem",
						element.style["line-height"] = "6.8rem", element.style.width = "initial";});
						dqs6.forEach(function(element) {element.style.display = "table";});
					}
				} else {
					body.forEach(function(element) {element.style.transform = "scale(1)";});
				}
			} else { 
				if (window.innerWidth < bodysize){
					body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / bodysize + ")";});
				} else { 
					body.forEach(function(element) {element.style.transform = "scale(1)";});
				}
			}

			if (self.config.Background) {
				if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":00:00") {
					dqs7.forEach(function(element) {element.style.backgound = "transparent";});
				} else {
					dqs7.forEach(function(element) {element.style.background = "transparent url(\"css/earth.png\") no-repeat center";});
				}
			} else {
				dqs7.forEach(function(element) {element.style.background = "transparent";});
			}

			if (self.config.DimMode) {
				if (self.config.FadeMode) {
					if (now >= self.config.FirstPoint + ":00:00" && now < self.config.FirstPoint + ":59:59") {
						body.forEach(function(element) {return element.style.opacity = opac1, element.style.filter = "grayscale(" + gray1 + "%)";});
					} else if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":00:00") {
						body.forEach(function(element) {return element.style.opacity = "0.50", element.style.filter = "grayscale(50%)";});
					} else if (now >= self.config.ThirdPoint + ":00:01" && now < self.config.ThirdPoint + ":59:59") {
						body.forEach(function(element) {return element.style.opacity = opac2, element.style.filter = "grayscale(" + gray2 + "%)";});
					} else if (now >= self.config.ForthPoint + ":00:00" && now < self.config.FifthPoint + ":59:59") {
						body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
					}
				} else { 
					if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":59:59") {
						body.forEach(function(element) {return element.style.opacity = "0.50", element.style.filter = "grayscale(50%)";});
					} else if (now >= self.config.ForthPoint + ":00:00" && now < self.config.FifthPoint + ":59:59") {
						body.forEach(function(element) {return element.style.opacity = "1", element.style.filter = "grayscale(0%)";});
					}
				}
			}
		}, 1000);
	},
});
