/* Magic Mirror
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 *
 * https://github.com/hangorazvan
 * Creative Commons BY-NC-SA 4.0, Romania.
 */
Module.register("notification", {

	defaults: {},
	
//	getScripts: function() {
//		return ["moment.js"];
//	},


//	getStyles: function () {
//		return ["font-awesome.css"];
//	},

	getTranslations: function() {
		return {
			en: "en.json",
			ro: "ro.json"
		};
	},

	start: function() {
		Log.info("Starting module: " + this.name);
	},

	notificationReceived: function(notification, payload, sender) {
		if (notification === "CLOCK_SECOND") {
			this.notification();
		}
	},

	notification: function() {
		var now = moment().format("HH:mm:ss");
		var secs = moment().format("s");
		var date = moment().format("DD-MM mm:ss");
		var ns_box = Array.from(document.querySelectorAll(".ns-box"));
		
		if (secs >= 15) { // not working this.sendNotification("HIDE_ALERT", {});
			ns_box.forEach(function(element) {element.style.display = "none";});
		}

		if (this.config.sharpMode) {
			if ((now == "23:00:00") || (now == "00:00:00") || (now == "01:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class='far fa-bell lime'></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Good night!")
				});
			} else if ((now == "02:00:00") || (now == "03:00:00") || (now == "04:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class='far fa-bell lime'></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Sleep well!")
				});
			} else if ((now == "05:00:00") || (now == "06:00:00") || (now == "07:00:00") || (now == "08:00:00") || 
				(now == "09:00:00") || (now == "10:00:00") || (now == "11:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class='far fa-bell lime'></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Good morning!")
				});
			} else if ((now == "12:00:00") || (now == "13:00:00") || (now == "14:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class='far fa-bell lime'></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Bon appetit!")
				});
			} else if ((now == "15:00:00") || (now == "16:00:00") || (now == "17:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class='far fa-bell lime'></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Have a nice day!")
				});
			} else if ((now == "18:00:00") || (now == "19:00:00") || (now == "20:00:00") || (now == "21:00:00") || (now == "22:00:00")) {
				this.sendNotification("SHOW_ALERT", {
					type: "notification", title: "<i class='far fa-bell lime'></i> " + this.translate("Sharp hour!"),
					message: this.translate("Time it was ") + moment().format("H:mm") + "<br>" + this.translate("Have a nice evening!")
				});
			}
		}

		if (this.config.dateMode) { 
			if ((date == "25-12 00:06") || (date == "26-12 00:06")) {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class='fa fa-gifts yellow'></i> " + this.translate("Marry Christmas!"),
					message: this.translate("Happy holidays with many joys!")
				});
			} else if ((date == "01-01 00:06") || (date == "02-01 00:06")) {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class='fa fa-glass-cheers yellow'></i> " + this.translate("Happy Birthday ") + moment().format("YYYY") + "!", 
					message: this.translate("A new year as good as possible and good health!")
				});
			} else if (date == "14-02 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class='far fa-heart redrf'></i> " + this.translate("Happy Valentine's Day!"),
					message: this.translate("Happy Valentine's and much happiness!")
				});
			} else if (date == this.config.Birthday1 + " 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class='fa fa-birthday-cake yellow'></i> " + this.translate("Happy Birthday, ") + this.config.Name1, 
					message: this.translate("Good health and be happy! F")
				});
			} else if (date == this.config.Birthday2 + " 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000,
					title: "<i class='fa fa-birthday-cake yellow'></i> " + this.translate("Happy Birthday, ") + this.config.Name2, 
					message: this.translate("Good health and be happy! M")
				});
			} else if (date == this.config.Birthday3 + " 00:06") {
				this.sendNotification("SHOW_ALERT", { type: "notification", timer: 8000, 
					title: "<i class='fa fa-birthday-cake yellow'></i> " + this.translate("Happy Birthday, ") + this.config.Name3, 
					message: this.translate("Good health and be happy! M")
				});
			}
		}
	},
});