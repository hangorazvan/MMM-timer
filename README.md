# MMM-timer
MagicMirror 2 Notification alert & timer trigger

put in config.js and is working in background
all settings are inside of module

<br>{
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;module: "timer",
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disabled: false,
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config: {
		SharpMode: true, // hourly alert notification
		DateMode: true, // specific date hourly alert notification
		FadeMode: true, // fade to dimmed mode over night and back in the morning
		NightMode: false, // zoomed night mode for iPad
		FirstPoint: "23", // time of fade start increase
		SecondPoint: "00", // time of fade stop increase and night mode start
		ThirdPoint: "06", // time of fade start decrease
		ForthPoint: "07", // time of fade mode stop decrease and day mode start
		FifthPoint: "22", // time of day mode stop
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
},
