# MMM-timer
MagicMirror 2 Notification alert & timer trigger for my own use in https://github.com/hangorazvan/MagicBoard on iPad3

Set in config.js and is working in background.
All settings are inside of module or in config.js

	{
		module: "timer",
		config: {
				bodysize: 1080,			// Minimum window width
				sharpMode: true,		// hourly alert notification
				dateMode: true,			// specific date hourly custom notification
				fadeMode: true,			// fade to dimmed mode over night and back in the morning
				dimmMode: true,			// dimmed mode over night
				nightMode: true,		// zoomed night mode for iPad 3
				dimming: 40,			// dimming amount (40% grayscale with 0.6 opacity or w.e.y.w. ex:70% grayscale with 0.3 opacity)
				midnight: 24,			// midnight or custom timer start
				name1: "Paula!",		// Wife or girlfriend name
				birthday1: "22-08",		// day & month
				name2: "Răzvan!",		// Husband or boyfriend name
				birthday2: "13-10",		// day & month
				name3: "",				// Child or pet name
				birthday3: ""			// day & month
		}
	},
	
For custom background this put in main.css
	
	.fullscreen.below {
		background: transparent;
		background-size: cover;
		opacity: 0.3;
		width: 100%;
		height: 100%;
	}
