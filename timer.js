/*	Magic Mirror 2
*	Module: Timer
*	by Razvan Cristea 
*	https://github.com/hangorazvan
*/

Module.register("timer", {
	defaults: {},
	
	getScripts: function() {return ["moment.js", "jquery.js"];},

	start: function() {
		Log.info("Starting module: " + this.name); var self = this;

		setInterval(function() {
			var now = moment().format("HH:mm:ss"); var date = moment().format("DD-MM mm:ss");
			var bodysize = 1080; $("body").css({"min-width": bodysize + "px"});
			var a = "23"; var b = "00"; var c = "06"; var d = "07"; // var e = "08";
			var f = "22"; var g = ":59"; var h = ":54"; var j = ":" + b;

			if ((now == "23" + j + j) || (now == "00" + j + j) || (now == "01" + j + j)) {
				self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: "<i class=\"far fa-bell\"></i> Ora exactă!", message: "<i class=\"far fa-clock\"></i> A fost ora " + moment().format("H:mm") + "<br><i class=\"fas fa-bed\"></i> Noapte bună!"});
			} else if ((now == "02" + j + j) || (now == "03" + j + j) || (now == "04" + j + j)) {
				self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: "<i class=\"far fa-bell\"></i> Ora exactă!", message: "<i class=\"far fa-clock\"></i> A fost ora " + moment().format("H:mm") + "<br><i class=\"fas fa-bed\"></i> Somn ușor!"});
			} else if ((now == "05" + j + j) || (now == "06" + j + j) || (now == "07" + j + j) || (now == "08" + j + j) || (now == "09" + j + j) || (now == "10" + j + j) || (now == "11" + j + j)) {
	 			self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: "<i class=\"far fa-bell\"></i> Ora exactă!", message: "<i class=\"far fa-clock\"></i> A fost ora " + moment().format("H:mm") + "<br><i class=\"fas fa-coffee\"></i> Bună dimineața!"});
			} else if ((now == "12" + j + j) || (now == "13" + j + j) || (now == "14" + j + j)) {
	 			self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: "<i class=\"far fa-bell\"></i> Ora exactă!", message: "<i class=\"far fa-clock\"></i> A fost ora " + moment().format("H:mm") + "<br><i class=\"fas fa-pizza-slice\"></i> Poftă bună la prânz!"});
			} else if ((now == "15" + j + j) || (now == "16" + j + j) || (now == "17" + j + j)) {
	 			self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: "<i class=\"far fa-bell\"></i> Ora exactă!", message: "<i class=\"far fa-clock\"></i> A fost ora " + moment().format("H:mm") + "<br><i class=\"far fa-smile\"></i> O zi cât mai bună!"});
			} else if ((now == "18" + j + j) || (now == "19" + j + j) || (now == "20" + j + j) || (now == "21" + j + j) || (now == "22" + j + j)) {
	 			self.sendNotification("SHOW_ALERT", {type: "notification", timer: 10000, title: "<i class=\"far fa-bell\"></i> Ora exactă!", message: "<i class=\"far fa-clock\"></i> A fost ora " + moment().format("H:mm") + "<br><i class=\"far fa-moon\"></i> O seară plăcută!"});
			}

			if ((date == "25-12 " + g + h) || (date == "26-12 " + g + h)) {
				self.sendNotification("SHOW_ALERT", {type: "notification", title: "<i class=\"far fa-bell\"></i> Crăciun fericit!", message: "<i class=\"fas fa-gifts\"></i> Sărbători fericite cu multe bucurii!"});
			} else if ((date == "01-01 " + g + h) || (date == "02-01 " + g + h)) {
				self.sendNotification("SHOW_ALERT", {type: "notification", title: "<i class=\"far fa-bell\"></i> La mulți ani " + moment().format("YYYY") + "!", message: "<i class=\"fas fa-glass-cheers\"></i> Un an nou cât mai bun și multă sănătate!"});
			} else if (date == "14-02 " + g + h) {
				self.sendNotification("SHOW_ALERT", {type: "notification", title: "<i class=\"far fa-bell\"></i> Happy Valentine's Day!", message: "<i class=\"fas fa-heart\"></i> La mulți ani cu sex si și orgasme multiple!"});
			}

			if (window.innerWidth < bodysize){
				$("body").css({"transform":"scale(" + window.innerWidth / bodysize + ")"});
			} else {
				$("body").css({"transform":"scale(1)"});
			}

			if (now >= a + j + j && now < a + ":09" + g) {
				$("body").css({"opacity":"0.93", "-webkit-filter":"grayscale(7.15%)"});
			} else if (now >= a + ":10" + j && now < a + ":19" + g) {
				$("body").css({"opacity":"0.86", "-webkit-filter":"grayscale(14.29%)"});
			} else if (now >= a + ":20" + j && now < a + ":29" + g) {
				$("body").css({"opacity":"0.79", "-webkit-filter":"grayscale(21.42%)"});
			} else if (now >= a + ":30" + j && now < a + ":39" + g) {
				$("body").css({"opacity":"0.71", "-webkit-filter":"grayscale(28.57%)"});
			} else if (now >= a + ":40" + j && now < a + ":49" + g) {
				$("body").css({"opacity":"0.64", "-webkit-filter":"grayscale(35.71%)"});
			} else if (now >= a + ":50" + j && now < a + g + g) {
				$("body").css({"opacity":"0.57", "-webkit-filter":"grayscale(42.85%)"});
			} else if (now >= b + j + j && now < c + g + g) {
				$("body").css({"opacity":"0.50", "-webkit-filter":"grayscale(50%)"});
			}

			if (now >= c + j + j && now < c + ":09" + g) {
				$("body").css({"opacity":"0.57", "-webkit-filter":"grayscale(42.85%)"});
			} else if (now >= c + ":10" + j && now < c + ":19" + g) {
				$("body").css({"opacity":"0.64", "-webkit-filter":"grayscale(35.71%)"});
			} else if (now >= c + ":20" + j && now < c + ":29" + g) {
				$("body").css({"opacity":"0.71", "-webkit-filter":"grayscale(28.57%)"});
			} else if (now >= c + ":30" + j && now < c + ":39" + g) {
				$("body").css({"opacity":"0.79", "-webkit-filter":"grayscale(21.42%)"});
			} else if (now >= c + ":40" + j && now < c + ":49" + g) {
				$("body").css({"opacity":"0.86", "-webkit-filter":"grayscale(14.29%)"});
			} else if (now >= c + ":50" + j && now < c + g + g) {
				$("body").css({"opacity":"0.93", "-webkit-filter":"grayscale(7.15%)"});
			} else if (now >= d + j + j && now < f + g + g) {
				$("body").css({"opacity":"1", "-webkit-filter":"grayscale(0%)"});
			}

		}, 1000);
	},
});
