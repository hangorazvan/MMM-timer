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
		dimming: 40,		// 0 = opacity 1, 100 = opacity 0, 40 = opacity 0.6
		name1: "",			// Wife or girlfriend name
		birthday1: "",		// day & month
		name2: "",			// Husband or boyfriend name
		birthday2: "",		// day & month
		name3: "",			// Child or pet name
		birthday3: ""		// day & month

		debugging: false 	// midnight for custom timer start
	},
	
	getScripts: function() {
		return ["moment.js"];
	},


	getStyles: function () {
		return ["font-awesome.css"];
	},

	getTranslations: function() {
		return {
			en: "en.json",
			ro: "ro.json"
		};
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;

		setInterval(function() {
			var now = moment().format("HH:mm:ss");
			var hide = moment().format("ss");
			var date = moment().format("DD-MM mm:ss");
			var dimm = moment().format("m");
			var grayscale = self.config.dimming;
			var opacity = (1-grayscale/100).toPrecision(2);
			var gray1 = (dimm * grayscale/60).toPrecision(4);
			var opac1 = (1-gray1/100).toPrecision(2);
			var gray2 = (grayscale-gray1).toPrecision(4);
			var opac2 = (1-gray2/100).toPrecision(2);
			var midnight = self.config.debugging || moment().startOf("day").format("HH");
			var before = parseInt(midnight) + 23;
			var morning = parseInt(midnight) - 18; 
			var after = parseInt(morning) + 1;
			var winter = moment().format("MM");
			if((winter>="01"&&winter<="03")||(winter>="11"&&winter<="12")){morning=morning+1;}
			if(self.config.debugging){if(before>23){before=midnight-1}else if(before<10){before="0"+before}if(midnight<=18){morning=parseInt(midnight)+6}
			if(morning>23){morning=morning-24}else if(morning<10){morning="0"+morning}if(after>23){after=after-24}else if(after<10){after="0"+after}
			Log.log("Midnight time: "+midnight+", Before midnight time: "+before+", Morning time: "+morning+", After morning time: "+after);
			Log.log("Midnight opacity: "+opac1+", Midnight grayscale: "+gray1+", Morning opacity: "+opac2+", Morning grayscale: "+gray2)}

			var dqs1 = Array.from(document.querySelectorAll(".calendar, .dailly, .hourly, .rssnews, .swatch"));
			var dqs2 = Array.from(document.querySelectorAll(".wicon"));
			var dqs3 = Array.from(document.querySelectorAll(".ns-box"));
			var dqs4 = Array.from(document.querySelectorAll(".weather"));
			var dqs5 = Array.from(document.querySelectorAll(".pre-line"));
			var dqs6 = Array.from(document.querySelectorAll(".monthly"));
			var body = Array.from(document.querySelectorAll("body"));

			body.forEach(function(element) {
				return element.style["min-height"] = window.innerHeight / (window.innerWidth / self.config.bodysize) + "px",
				element.style["min-width"] = self.config.bodysize + "px";
			});

			if (self.config.sharpMode) {
				if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Good night!")
					});
				} else if ((now == "02:00:00") || (now == "03:00:00") || (now == "04:00:00")) {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", title: "<i class='far fa-bell lime'></i> " + self.translate("Sharp hour!"),
						message: self.translate("Time it was ") + moment().format("H:mm") + "<br>" + self.translate("Sleep well!")
					});
				} else if ((now == "05:00:00") || (now == "06:00:00") || (now == "07:00:00") || (now == "08:00:00") || 
					(now == "09:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
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
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 8000, 
						title: "<i class='fa fa-glass-cheers yellow'></i> " + self.translate("Happy Birthday ") + moment().format("YYYY") + "!", 
						message: self.translate("A new year as good as possible and good health!")
					});
				} else if (date == "14-02 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 8000, 
						title: "<i class='far fa-heart redrf'></i> " + self.translate("Happy Valentine's Day!"),
						message: self.translate("Happy Valentine's and much happiness!")
					});
				} else if (date == self.config.Birthday1 + " 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 8000, 
						title: "<i class='fa fa-birthday-cake yellow'></i> " + self.translate("Happy Birthday, ") + self.config.Name1, 
						message: self.translate("Good health and be happy! F")
					});
				} else if (date == self.config.Birthday2 + " 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 8000, 
						title: "<i class='fa fa-birthday-cake yellow'></i> " + self.translate("Happy Birthday, ") + self.config.Name2, 
						message: self.translate("Good health and be happy! M")
					});
				} else if (date == self.config.Birthday3 + " 00:06") {
					self.sendNotification("SHOW_ALERT", {
						type: "notification", timer: 8000, 
						title: "<i class='fa fa-birthday-cake yellow'></i> " + self.translate("Happy Birthday, ") + self.config.Name3, 
						message: self.translate("Good health and be happy! M")
					});
				}
			}

			if (hide == "59") {
				dqs3.forEach(function(element) {
					element.style.display = "none";
				});
			}

			if (window.innerWidth < self.config.bodysize) {
				body.forEach(function(element) {
					element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";
				});

				if (self.config.nightMode) {
					if (now >= midnight + ":00:00" && now < morning + ":00:00") {
						body.forEach(function(element) {
							element.style.transform = "scale(" + window.innerWidth / self.config.bodysize * 1.55 + ")";
						});
						dqs1.forEach(function(element) {
							element.style.display = "none";
						});
						dqs2.forEach(function(element) {
							element.style.float = "right";
						});
						dqs4.forEach(function(element) {
							return element.style.transform = "translate(-720px, 270px)",
							element.style["text-align"] = "left";
						});
						dqs5.forEach(function(element) {
							return element.style.position = "absolute",
							element.style.transform = "translate(-300px, -400px) scale(0.45)",
							element.style.width = "600px";
						});
						dqs6.forEach(function(element) {
							element.style.display = "none";
						});
					} else { recursive();
						body.forEach(function(element) {
							element.style.transform = "scale(" + window.innerWidth / self.config.bodysize + ")";
						});
					}
				}
			} else { recursive();
				body.forEach(function(element) {
					element.style.transform = "scale(1)";
				});
			}

			function recursive(){
				dqs1.forEach(function(element) {
					element.style.display = "inherit";
				});
				dqs2.forEach(function(element) {
					element.style.float = "left";
				});
				dqs4.forEach(function(element) {
					return element.style.transform = "translate(0, 0)",
					element.style["text-align"] = "inherit";
				});
				dqs5.forEach(function(element) {
					return element.style.position = "inherit",
					element.style.transform = "scale(1)",
					element.style.width = "inherit";
				});
				dqs6.forEach(function(element) {
					element.style.display = "table";
				});
			}

			if (self.config.dimmMode) {
				if (self.config.fadeMode) {
					if (now >= before + ":00:00" && now < midnight + ":00:00") {
						body.forEach(function(element) {
							return element.style.opacity = opac1,
							element.style.filter = "grayscale(" + gray1 + "%)";
						});
					} else if (now >= midnight + ":00:00" && now < morning + ":00:00") {
						body.forEach(function(element) {
							return element.style.opacity = opacity,
							element.style.filter = "grayscale(" + grayscale + "%)";
						});
					} else if (now >= morning + ":00:00" && now < after + ":00:00") {
						body.forEach(function(element) {
							return element.style.opacity = opac2,
							element.style.filter = "grayscale(" + gray2 + "%)";
						});
					} else {
						body.forEach(function(element) {
							return element.style.opacity = "1",
							element.style.filter = "grayscale(0%)";
						});
					}
				} else { if (now >= midnight + ":00:00" && now < morning + ":00:00") {
						body.forEach(function(element) {
							return element.style.opacity = opacity,
							element.style.filter = "grayscale(" + grayscale + "%)"
						});
					} else {
						body.forEach(function(element) {
							return element.style.opacity = "1",
							element.style.filter = "grayscale(0%)";
						});
					}
				}
			}
		},1000);
	},
});