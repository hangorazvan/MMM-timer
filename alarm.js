/* Magic Mirror 2
*  Module: Alarm
*  by Razvan Cristea 
*  https://github.com/hangorazvan
*/
 
Module.register("alarm",{

	defaults: {
	},

	getScripts: function() {
		return ["moment.js"];
	},

	start: function() {
		Log.info("Starting module: " + this.name);

		var self = this;
	    setInterval(function() {

	        var now = moment().format('HH:mm:ss');
	        var hourly = moment().format('mm:ss');
	        var date = moment().format('DD-MM mm:ss');

            if (now >= '00:00:00' && now < '06:59:59') {
                $('body').css({'opacity':'0.4', '-webkit-filter':'grayscale(60%)'});
            }
            if ((now >= '07:00:00' && now < '07:59:59') || (now >= '23:00:00' && now < '23:59:59')) {
                $('body').css({'opacity':'0.8', '-webkit-filter':'grayscale(30%)'});
            }
            if (now >= '08:00:00' && now < '22:59:59') {
                $('body').css({'opacity':'1', '-webkit-filter':'grayscale(0%)'});
            }
    	    if ((now == '23:00:05') || (now == '00:00:05')) {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "Noapte bună!", message: "Să ai un somn ușor"});
		    }
    	    if ((now == '07:00:05') || (now == '08:00:05')) {
     		    self.sendNotification("SHOW_ALERT", {type: "notification", title: "Bună dimineața!", message: "Să ai o zi excelentă"});
		    }
    	    if (hourly == '00:59') {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "Ora exactă", message: "A fost ora " + moment().format('H:mm')});
		    }
    	    if ((date == '25-12 00:54') || (date == '26-12 00:54')) {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "Crăciun fericit!", message: "Sărbători fericite cu multe bucurii!"});
		    }
    	    if ((date == '01-01 00:54') || (date == '02-01 00:54')) {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "La mulți ani " + moment().format('YYYY') + "!", message: "Un an nou prosper și multă sănătate!"});
		    }
	    }, 500);
	},
});
