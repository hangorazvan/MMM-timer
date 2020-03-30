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

	        var timer = moment().format('HH:mm:ss');
	        var hourly = moment().format('mm:ss');
//	        var date = moment().format('DD-MM mm:ss');

    	    if (timer == '23:00:00') {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "Noapte bună!", message: "Este timpul de culcare"});
		    }
    	    if (timer == '00:00:00') {
                self.sendNotification("SHOW_ALERT", {type: "notification", title: "Noapte bună!", message: "Să ai un somn ușor"});
//     		    self.sendNotification("SHOW_ALERT", {timer: 5000, imageFA: "bed", title: "Noapte bună", message: "Să ai un somn ușor"});
		    }
    	    if (timer == '07:00:00') {
     		    self.sendNotification("SHOW_ALERT", {type: "notification", title: "Bună dimineața!", message: "Este timpul de trezire"});
//     		    self.sendNotification("SHOW_ALERT", {timer: 5000, imageFA: "bell", title: "Bună dimineața!", message: "Este timpul de trezire"});
		    }
    	    if (timer == '08:00:00') {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "Bună dimineața!", message: "Să ai o zi excelentă"});
		    }
    	    if (hourly == '00:00') {
    	        self.sendNotification("SHOW_ALERT", {type: "notification", title: "Ora exactă", message: "A fost ora " + moment().format('H')});
		    }

	    }, 1000);
	},
});