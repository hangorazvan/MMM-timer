# MMM-timer
MagicMirror 2 Notification alert & timer trigger for my own use in https://github.com/hangorazvan/MagicBoard on iPad3

Set in config.js and is working in background.
All settings are inside of module or in config.js

	{
		module: "timer",
		config: {
			Bodysize: 1080,			// Minimum window width
			SharpMode: true,		// hourly alert notification
			DateMode: true,			// specific date hourly alert notification
			FadeMode: true,			// fade to dimmed mode over night and back in the morning
			DimMode: true,			// dimmed mode over night
			NightMode: true,		// zoomed night mode for iPad 3
			Background: false,		// background image set for .fullscreen.below in css file
			Reload: false,			// reload page
			Reinit: false,			// reinitialised MM
			FirstPoint: "23",		// time of fade start increase
			SecondPoint: "00",		// time of fade stop increase and night mode start
			ThirdPoint: "06",		// time of fade start decrease and day mode start
			ForthPoint: "07",		// time of fade mode stop decrease
			FifthPoint: "22",		// time of day mode stop
			Name1: "Paula!",		// Wife or girlfriend name
			Birthday1: "22-08",		// day & month
			Name2: "Răzvan!",		// Husband or boyfriend name
			Birthday2: "13-10",		// day & month
			Name3: "",			// child or pet name
			Birthday3: "",			// day & month
		}
	},
	
For custom background put this in custom.css
	
	.fullscreen.below {
		background: transparent;
		background-size: cover;
		opacity: 0.3;
		width: 100%;
		height: 100%;
	}
