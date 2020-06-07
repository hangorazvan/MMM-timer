# MMM-timer
MagicMirror 2 Notification alert & timer trigger

put in config.js and is working in background
all settings are inside of module

<br>{
<br>module: "timer",
<br>config: {
<br>	SharpMode: true, // hourly alert notification
<br>	DateMode: true, // specific date hourly alert notification
<br>	FadeMode: true, // fade to dimmed mode over night and back in the morning
<br>	NightMode: false, // zoomed night mode for iPad
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FirstPoint: "23", // time of fade start increase
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SecondPoint: "00", // time of fade stop increase and night mode start
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ThirdPoint: "06", // time of fade start decrease
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ForthPoint: "07", // time of fade mode stop decrease and day mode start
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FifthPoint: "22", // time of day mode stop
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
},
