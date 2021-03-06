# MMM-Iridium
This is a work in progress so please use with that in mind.

Displays Upcoming Iridium Flare Siting 'forecasts'  

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can display Iridium Flare sitings ... currently set for Weaverville, NC ...  but I will be working on adding customized settings.

Flare 'forecasts' are pulled every six hours from heavens-above.com (http://www.heavens-above.com/).  Please note the site seems to have a limitation on the number of 'hits' you make to the web site... but four a day should suffice for getting and updating Iridium Flare sitings.

## Dependencies
- An installation of MagicMirror2
- npm
- request
- cheerio

## Installation
1. Navigate into your MagicMirror's `modules` folder `cd ~/MagicMirror/modules`
2. Execute:  `git clone https://github.com/tkotz8105/MMM-Iridium.git`.
2. A new folder "MMM-Iridium" will appear... navigate into it ... `cd ./MMM-Iridium`
2. Execute `npm install` to install the node dependencies.


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
   {
	module: 'MMM-Iridium',
	position: 'top_left',
	header: 'Iridium Flares',
	config: {
		maximumEntries: 7,
		updateInterval: 6 * 60 * 60 * 1000,	// Every 6 hours
		latitude: 34.0307,		// Positive for Northern Hemisphere, Negative for Southern Hemisphere
		longitude: -84.3347,		// Positive for eastern longitudes, negative for western longitudes
		location: "Home",		// Holding location in reserve for future use
		altitude: 642,			// Holding altitude in reserve for future use
		timezone: "EST"			// Set timezone: EST, CST, MST, PST
	}
   },

````
