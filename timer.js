/* Magic Mirror 2
*  Module: Timer
*  by Razvan Cristea 
*  https://github.com/hangorazvan
*/
 
Module.register("timer",{

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
	        
	        var bodysize = 1080;
            $('body').css({'background':'black', 'min-width': (bodysize-10) + 'px'});

            if (now >= '00:00:00' && now < '06:59:59') {
                $('body').css({'opacity':'0.4', '-webkit-filter':'grayscale(60%)'});

            	if (window.innerWidth < bodysize){
        	    	$('body').css({'transform':'scale(' + window.innerWidth / bodysize * 1.55 + ')'});
        	    } else {
        		    $('body').css({'transform':'scale(1)'});
        	    }

                $('.calendar, .monthly').css({'display':'none'});
    	    	$('.weather').css({'position':'relative','left':'-720px','top':'290px','text-align':'left'});
    	    	$('.pre-line').css({'width':'300px','position':'relative','left':'380px','top':'-200px','font-size':'3.5rem','line-height':'3.7rem',});
            }

            if ((now >= '07:00:00' && now < '07:59:59') || (now >= '23:00:00' && now < '23:59:59')) {
                $('body').css({'opacity':'0.7', '-webkit-filter':'grayscale(30%)'});
                
            	if (window.innerWidth < bodysize){
        	    	$('body').css({'transform':'scale(' + window.innerWidth / bodysize * 1.55 + ')'});
        	    } else {
        		    $('body').css({'transform':'scale(1)'});
        	    }

                $('.calendar, .monthly').css({'display':'none'});
    	    	$('.weather').css({'position':'relative','left':'-720px','top':'290px','text-align':'left'});
    	    	$('.pre-line').css({'width':'300px','position':'relative','left':'380px','top':'-200px','font-size':'3.5rem','line-height':'3.7rem',});
            }

            if (now >= '08:00:00' && now < '22:59:59') {
                $('body').css({'opacity':'1', '-webkit-filter':'grayscale(0%)'});

               	if (window.innerWidth < bodysize){
        	    	$('body').css({'transform':'scale(' + window.innerWidth / bodysize + ')'});
        	    } else {
        		    $('body').css({'transform':'scale(1)'});
        	    }

    	        $('.calendar, .monthly').css({'display':'inherit'});
    	    	$('.weather').css({'position':'inherit','left':'inherit','top':'inherit','text-align':'inherit'});
    	    	$('.pre-line').css({'width':'inherit','position':'inherit','left':'inherit','top':'inherit','font-size':'6.5rem','line-height':'6.7rem',});
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
	    }, 1000);
	},
});