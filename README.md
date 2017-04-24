# MMM-Iridium
This is a work in progress so please use with that in mind.

Displays Upcoming Iridium Flare Siting 'forecasts' ... currently hardwired for Weaverville, NC.  

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can display Iridium Flare sitings ... currently set for Weaverville, NC ...  but I will be working on adding customized settings.

Flare 'forecasts' are pulled every six hours from 'http://www.heavens-above.com/'.  Please note the site has a limitation on the number of 'hits' you make to the web site... but four a day should suffice.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/tkotz8105/MMM-Iridium.git`. A new folder will appear navigate into it.
2. Execute `npm install` to install the node dependencies.
3. The routine requires 'cheerio.js' so run 'npm install cheerio'.


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Iridium',
		position: 'top_right',	// This can be any of the regions.
		header: 'Iridium Flares', // This is optional
		config: { // There are no configurable items at this time but they will be.
      }
	}
]
````
