/*	Magic Mirror 2
*	Module: Timer
*	by Razvan Cristea 
*	https://github.com/hangorazvan
*/

Module.register("timer", {
	defaults: {
		SharpMode: true, // hourly alert notification
		DateMode: true, //  specific date hourly alert notification
		FadeMode: true, // fade to dimmed mode over night and back in the morning
		NightMode: false, // zoomed night mode for iPad
		FirstPoint: "23", // time of fade start increase
		SecondPoint: "00", // time of fade stop increase and night mode start
		ThirdPoint: "06", // time of fade start decrease
		ForthPoint: "07", // time of fade mode stop decrease and day mode start
		FifthPoint: "22", // time of day mode stop
	},
	
	getStyles: function() {
		return [];
	},

	getScripts: function() {
		return ["moment.js"];
	},

	getTranslations: function() {
		return {
			en: "en.json",
			ro: "ro.json",
		};
	},

	start: function() {
		Log.info("Starting module: " + this.name); 
		var self = this;

		setInterval(function() {
			var now = moment().format("HH:mm:ss"); var date = moment().format("DD-MM mm:ss");
			var bodysize = 1080; document.querySelector("body").style["min-width"] = bodysize + "px";

			if (self.config.SharpMode) {
				if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: self.translate("Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Noapte bună!")});
				} else if ((now == "02:00:00") || (now == "03:00:00") || (now == "04:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: self.translate("Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Somn ușor!")});
				} else if ((now == "05:00:00") || (now == "06:00:00") || (now == "07:00:00") || (now == "08:00:00") || (now == "09:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: self.translate("Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Bună dimineața!")});
				} else if ((now == "12:00:00") || (now == "13:00:00") || (now == "14:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: self.translate("Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Poftă bună!")});
				} else if ((now == "15:00:00") || (now == "16:00:00") || (now == "17:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: self.translate("Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("O zi cât mai bună!")});
				} else if ((now == "18:00:00") || (now == "19:00:00") || (now == "20:00:00") || (now == "21:00:00") || (now == "22:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: self.translate("Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("O seară plăcută!")});
				}
			}

			if (self.config.DateMode) {
				if ((date == "25-12 59:54") || (date == "26-12 59:54")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("Crăciun fericit!"), message: self.translate("Sărbători fericite cu multe bucurii!")});
				} else if ((date == "01-01 59:54") || (date == "02-01 59:54")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("La mulți ani ") + moment().format("YYYY") + "!", message: self.translate("Un an nou cât mai bun și multă sănătate!")});
				} else if (date == "22-08 59:54") {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("La mulți ani,") + " Paula!", message: self.translate("Multă sănătate și să fi fericită!")});
				} else if (date == "13-10 59:54") {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("La mulți ani,") + " Răzvan!", message: self.translate("Multă sănătate și să fi fericit!")});
				} else if (date == "14-02 59:54") {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("Happy Valentine's Day!"), message: self.translate("La mulți ani și multă fericire!")});
				}
			}

			if (!self.config.NightMode) {
				if (window.innerWidth < bodysize){
					document.querySelector("body").style.transform = "scale(" + window.innerWidth / bodysize + ")";
				} else {
					document.querySelector("body").style.transform = "scale(1)";
				}
			}

			if (self.config.NightMode) {
				if (window.innerWidth < bodysize){
					if ((now >= self.config.FirstPoint + ":00:00" && now < self.config.FirstPoint + ":59:59") || (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":59:59")) {
						document.querySelector("body").style.transform = "scale(" + window.innerWidth / bodysize * 1.5 + ")";
						document.querySelector(".calendar").style.display = "none";
						document.querySelector(".monthly").style.display = "none";
						document.querySelector(".weather").classList.add("wscaled");
						document.querySelector(".pre-line").classList.add("cscaled");
					} else if (now >= self.config.ForthPoint + ":00:00" && now < self.config.FifthPoint + ":59:59") {
						document.querySelector("body").style.transform = "scale(" + window.innerWidth / bodysize + ")";
						document.querySelector(".calendar").style.display = "inherit";
						document.querySelector(".monthly").style.display = "inherit";
						document.querySelector(".weather").classList.remove("wscaled");
						document.querySelector(".pre-line").classList.remove("cscaled");
					} 
				} else {
					document.querySelector("body").style.transform = "scale(1)";
					document.querySelector(".calendar").style.display = "inherit";
					document.querySelector(".monthly").style.display = "inherit";
					document.querySelector(".weather").classList.remove("wscaled");
					document.querySelector(".pre-line").classList.remove("cscaled");
				}
			}
			
			if (self.config.FadeMode) {
				if (now >= self.config.FirstPoint + "00:00" && now < self.config.FirstPoint + ":09:59") {
					document.querySelector("body").style.opacity = "0.93";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(7.15%)";
				} else if (now >= self.config.FirstPoint + ":10:00" && now < self.config.FirstPoint + ":19:59") {
					document.querySelector("body").style.opacity = "0.86";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(14.29%)";
				} else if (now >= self.config.FirstPoint + ":20:00" && now < self.config.FirstPoint + ":29:59") {
					document.querySelector("body").style.opacity = "0.79";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(21.42%)";
				} else if (now >= self.config.FirstPoint + ":30:00" && now < self.config.FirstPoint + ":39:59") {
					document.querySelector("body").style.opacity = "0.71";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(28.57%)";
				} else if (now >= self.config.FirstPoint + ":40:00" && now < self.config.FirstPoint + ":49:59") {
					document.querySelector("body").style.opacity = "0.64";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(35.71%)";
				} else if (now >= self.config.FirstPoint + ":50:00" && now < self.config.FirstPoint + ":59:59") {
					document.querySelector("body").style.opacity = "0.57";
					ddocument.querySelector("body").style["-webkit-filter"] = "grayscale(42.85%)";
				} else if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":59:59") {
					document.querySelector("body").style.opacity = "0.50";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(50%)";
				}

				if (now >= self.config.ThirdPoint + "00:00" && now < self.config.ThirdPoint + ":09:59") {
					document.querySelector("body").style.opacity = "0.57";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(42.85%)";
				} else if (now >= self.config.ThirdPoint + ":10:00" && now < self.config.ThirdPoint + ":19:59") {
					document.querySelector("body").style.opacity = "0.64";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(35.71%)";
				} else if (now >= self.config.ThirdPoint + ":20:00" && now < self.config.ThirdPoint + ":29:59") {
					document.querySelector("body").style.opacity = "0.71";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(28.57%)";
				} else if (now >= self.config.ThirdPoint + ":30:00" && now < self.config.ThirdPoint + ":39:59") {
					document.querySelector("body").style.opacity = "0.79";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(21.42%)";
				} else if (now >= self.config.ThirdPoint + ":40:00" && now < self.config.ThirdPoint + ":49:59") {
					document.querySelector("body").style.opacity = "0.86";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(14.29%)";
				} else if (now >= self.config.ThirdPoint + ":50:00" && now < self.config.ThirdPoint + ":59:59") {
					document.querySelector("body").style.opacity = "0.93";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(7.15%)";
				} else if (now >= self.config.ForthPoint + ":00:00" && now < self.config.FifthPoint + ":59:59") {
					document.querySelector("body").style.opacity = "1";
					document.querySelector("body").style["-webkit-filter"] = "grayscale(0%)";
				}
			}

		}, 1000);
	},
});
