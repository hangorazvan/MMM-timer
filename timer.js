/*	Magic Mirror 2
*	Module: Timer
*	by Razvan Cristea 
*	https://github.com/hangorazvan
*/

Module.register("timer", {
	defaults: {
		SharpMode: true,	// hourly alert notification
		DateMode: true,		// specific date hourly alert notification
		FadeMode: true,		// fade to dimmed mode over night and back in the morning
		NightMode: true,	// zoomed night mode for iPad
		Background: true,	// Background image set for .fullscreen.below in css file
		Reload: false,		// Reload page
		Reinit: false,		// Reinitialised
		FirstPoint: "23",	// time of fade start increase
		SecondPoint: "00",	// time of fade stop increase and night mode start
		ThirdPoint: "06",	// time of fade start decrease
		ForthPoint: "07",	// time of fade mode stop decrease and day mode start
		FifthPoint: "22",	// time of day mode stop
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
		Log.info("Starting module: " + this.name); var self = this;

		setInterval(function() {
			var now = moment().format("HH:mm:ss"); var hide = moment().format("ss");
			var date = moment().format("DD-MM mm:ss"); var bodysize = 1080;
			var dqs1 = Array.from(document.querySelectorAll(".calendar, .dailly, .rssnews"));
			var dqs2 = Array.from(document.querySelectorAll(".wicon"));
			var dqs3 = Array.from(document.querySelectorAll(".wtemp"));
			var dqs4 = Array.from(document.querySelectorAll(".weather"));
			var dqs5 = Array.from(document.querySelectorAll(".pre-line"));
			var dqs6 = Array.from(document.querySelectorAll(".monthly"));
			var fsba = Array.from(document.querySelectorAll(".fullscreen.below"));
			var body = Array.from(document.querySelectorAll("body"));
			body.forEach(function(element) {element.style["min-width"] = bodysize + "px"});

			if (self.config.Reload) {
				if (now == "00:00:00") {
					location.reload();
				}
			}

			if (self.config.Reinit) {
				if (now == "00:00:00") {
					MM.init();
				}
			}

			if (self.config.SharpMode) {
				if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("<i class=\"far fa-bell lime\"></i> Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Noapte bună!")});
				} else if ((now == "02:00:00") || (now == "03:00:00") || (now == "04:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("<i class=\"far fa-bell lime\"></i> Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Somn ușor!")});
				} else if ((now == "05:00:00") || (now == "06:00:00") || (now == "07:00:00") || (now == "08:00:00") || (now == "09:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("<i class=\"far fa-bell lime\"></i> Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Bună dimineața!")});
				} else if ((now == "12:00:00") || (now == "13:00:00") || (now == "14:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("<i class=\"far fa-bell lime\"></i> Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("Poftă bună!")});
				} else if ((now == "15:00:00") || (now == "16:00:00") || (now == "17:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("<i class=\"far fa-bell lime\"></i> Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("O zi cât mai bună!")});
				} else if ((now == "18:00:00") || (now == "19:00:00") || (now == "20:00:00") || (now == "21:00:00") || (now == "22:00:00")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", title: self.translate("<i class=\"far fa-bell lime\"></i> Ora exactă!"), message: self.translate("A fost ora ") + moment().format("H:mm") + "<br>" + self.translate("O seară plăcută!")});
				}
			}

			if (self.config.DateMode) {
				if ((date == "25-12 00:06") || (date == "26-12 00:06")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 9000, title: self.translate("<i class=\"fa fa-gifts yellow\"></i> Crăciun fericit!"), message: self.translate("Sărbători fericite cu multe bucurii!")});
				} else if ((date == "01-01 00:06") || (date == "02-01 00:06")) {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 9000, title: self.translate("<i class=\"fa fa-glass-cheers yellow\"></i> La mulți ani ") + moment().format("YYYY") + "!", message: self.translate("Un an nou cât mai bun și multă sănătate!")});
				} else if (date == "22-08 00:06") {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 9000, title: self.translate("<i class=\"fa fa-birthday-cake yellow\"></i> La mulți ani,") + " Paula!", message: self.translate("Multă sănătate și să fi fericită!")});
				} else if (date == "13-10 00:06") {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 9000, title: self.translate("<i class=\"fa fa-birthday-cake yellow\"></i> La mulți ani,") + " Răzvan!", message: self.translate("Multă sănătate și să fi fericit!")});
				} else if (date == "14-02 00:06") {
					self.sendNotification("SHOW_ALERT", {type: "notification", timer: 9000, title: self.translate("<i class=\"far fa-heart redrf\"></i> Happy Valentine's Day!"), message: self.translate("La mulți ani și multă fericire!")});
				}
			}
			
			if ((hide == "16") || (hide == "31") || (hide == "46")) {
				self.sendNotification("HIDE_ALERT");
			}

			if (self.config.NightMode) {
				if (window.innerWidth < bodysize) {
					if ((now >= self.config.FirstPoint + ":00:00" && now < self.config.FirstPoint + ":59:59") || (now >= self.config.SecondPoint + ":00:00" && now < "05:59:59")) {
						body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / bodysize * 1.55 + ")"});
						dqs1.forEach(function(element) {element.style.display = "none"});
						dqs2.forEach(function(element) {element.style.float = "right"});
						dqs3.forEach(function(element) {element.style["margin-left"] = "-25px"});
						dqs4.forEach(function(element) {element.style.position = "relative", element.style.left = "-750px",
						element.style.top = "280px", element.style["text-align"] = "left"});
						dqs5.forEach(function(element) {element.style.position = "relative", 
						element.style.left = "395px", element.style.top = "-180px", element.style["font-size"] = "3.5rem",
						element.style["line-height"] = "4rem", element.style.width = "300px"});
						dqs6.forEach(function(element) {element.style.display = "none"});
					} else if (now >= self.config.ThirdPoint + ":00:00" && now < self.config.FifthPoint + ":59:59") {
						body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / bodysize + ")"});
						dqs1.forEach(function(element) {element.style.all = "initial"});
						dqs2.forEach(function(element) {element.style.all = "initial"});
						dqs3.forEach(function(element) {element.style.all = "initial"});
						dqs4.forEach(function(element) {element.style.all = "initial"});
						dqs5.forEach(function(element) {element.style.all = "initial"});
						dqs6.forEach(function(element) {element.style.display = "table"});
					} 
				} else {
					body.forEach(function(element) {element.style.transform = "scale(1)"});
					dqs1.forEach(function(element) {element.style.all = "initial"});
					dqs2.forEach(function(element) {element.style.all = "initial"});
					dqs3.forEach(function(element) {element.style.all = "initial"});
					dqs4.forEach(function(element) {element.style.all = "initial"});
					dqs5.forEach(function(element) {element.style.all = "initial"});
					dqs6.forEach(function(element) {element.style.display = "table"});
				}
			} else {
				if (window.innerWidth < bodysize){
					body.forEach(function(element) {element.style.transform = "scale(" + window.innerWidth / bodysize + ")"});
				} else {
					body.forEach(function(element) {element.style.transform = "scale(1)"});
				}
			}

			if (self.config.Background) {
				if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":00:00") {
					fsa.forEach(function(element) {element.style.backgound = "transparent"});
				} else {
					fsba.forEach(function(element) {element.style.background = "transparent url(\"css/earth.png\") no-repeat center"});
				}
			} else {
				fsba.forEach(function(element) {element.style.background = "transparent"});
			}

			if (self.config.DimMode) {
				if (self.config.FadeMode) {
					if (now >= self.config.FirstPoint + "00:00" && now < self.config.FirstPoint + ":09:59") {
						body.forEach(function(element) {element.style.opacity = "0.93", element.style.filter = "grayscale(7.15%)"});
					} else if (now >= self.config.FirstPoint + ":10:00" && now < self.config.FirstPoint + ":19:59") {
						body.forEach(function(element) {element.style.opacity = "0.86", element.style.filter = "grayscale(14.29%)"});
					} else if (now >= self.config.FirstPoint + ":20:00" && now < self.config.FirstPoint + ":29:59") {
						body.forEach(function(element) {element.style.opacity = "0.79", element.style.filter = "grayscale(21.42%)"});
					} else if (now >= self.config.FirstPoint + ":30:00" && now < self.config.FirstPoint + ":39:59") {
						body.forEach(function(element) {element.style.opacity = "0.71", element.style.filter = "grayscale(28.57%)"});
					} else if (now >= self.config.FirstPoint + ":40:00" && now < self.config.FirstPoint + ":49:59") {
						body.forEach(function(element) {element.style.opacity = "0.64", element.style.filter = "grayscale(35.71%)"});
					} else if (now >= self.config.FirstPoint + ":50:00" && now < self.config.FirstPoint + ":59:59") {
						body.forEach(function(element) {element.style.opacity = "0.57", element.style.filter = "grayscale(42.85%)"});
					} else if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":00:00") {
						body.forEach(function(element) {element.style.opacity = "0.50", element.style.filter = "grayscale(50%)"});
					} else if (now >= self.config.ThirdPoint + "00:01" && now < self.config.ThirdPoint + ":09:59") {
						body.forEach(function(element) {element.style.opacity = "0.57", element.style.filter = "grayscale(42.85%)"});
					} else if (now >= self.config.ThirdPoint + ":10:00" && now < self.config.ThirdPoint + ":19:59") {
						body.forEach(function(element) {element.style.opacity = "0.64", element.style.filter = "grayscale(35.71%)"});
					} else if (now >= self.config.ThirdPoint + ":20:00" && now < self.config.ThirdPoint + ":29:59") {
						body.forEach(function(element) {element.style.opacity = "0.71", element.style.filter = "grayscale(28.57%)"});
					} else if (now >= self.config.ThirdPoint + ":30:00" && now < self.config.ThirdPoint + ":39:59") {
						body.forEach(function(element) {element.style.opacity = "0.79", element.style.filter = "grayscale(21.42%)"});
					} else if (now >= self.config.ThirdPoint + ":40:00" && now < self.config.ThirdPoint + ":49:59") {
						body.forEach(function(element) {element.style.opacity = "0.86", element.style.filter = "grayscale(14.29%)"});
					} else if (now >= self.config.ThirdPoint + ":50:00" && now < self.config.ThirdPoint + ":59:59") {
						body.forEach(function(element) {element.style.opacity = "0.93", element.style.filter = "grayscale(7.15%)"});
					} else if (now >= self.config.ForthPoint + ":00:00" && now < self.config.FifthPoint + ":59:59") {
						body.forEach(function(element) {element.style.opacity = "1", element.style.filter = "grayscale(0%)"});
					}
				} else {
					if (now >= self.config.SecondPoint + ":00:00" && now < self.config.ThirdPoint + ":00:00") {
						body.forEach(function(element) {element.style.opacity = "0.50", element.style.filter = "grayscale(50%)"});
					} else if (now >= self.config.ThirdPoint + ":00:01" && now < self.config.FifthPoint + ":59:59") {
						body.forEach(function(element) {element.style.opacity = "1", element.style.filter = "grayscale(0%)"});
					}
				}
			}
		}, 1000);
	},
});
