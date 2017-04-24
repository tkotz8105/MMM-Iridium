/* global Module */

/* Magic Mirror
 * Module: MMM-Iridium
 *
 * By Tom Kotz
 * MIT Licensed.
 */

Module.register("MMM-Iridium",{

	// Default module config.
	defaults: {
		maximumEntries: 7,
		updateInterval: 6 * 60 * 60 * 1000,		// Every 6 hours
		latitude: 35.6744,						// Positive for Northern Hemisphere, Negative for Southern Hemispher
		longitude: -82.5913,					// Positive for eastern longitudes, negative for western longitudes
		location: "Home",						// Holding location in reserve for future use
		altitude: 642,							// Holding altitude in reserve for future use
		timezone: "EST"							// Set timezone: EST, CST, MST, PST
	},
 // Override socket notification handler.
 socketNotificationReceived: function(notification, payload) {
	var tiridiums = [];
	console.log(notification);
	console.log(this.started);
	if (notification === "IRIDIUMS" && this.started==false) {
		this.iridiums=payload;
//		console.log(payload);
//		console.log(this.iridiums);
		this.getDom();
		this.updateDom(1000);
		this.started=true;
	} else if (notification === "IRIDIUMS") {
		this.iridiums = payload
		this.updateDom(3000);
	}
 },

	start: function() {
		console.log("Starting module: " + this.name);
		this.iridiums=[];
		this.started=false;
		this.sendSocketNotification("CONFIG", this.config);
	},

	getIridiums: function() {
		var iridiumsShown = [];
		for (var i in this.iridiums) {
			iridiumsShown.push(this.iridiums[i]);
		}
		return iridiumsShown.slice(0, this.config.maximumEntries);
 },

	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("table");
		wrapper.className = "normal small light";
		var iridiums = this.getIridiums();
		console.log(iridiums);
		console.log(iridiums.length);
		for (var i = 0; i < iridiums.length; i++) {
			var titleWrapper = document.createElement("tr");
			titleWrapper.innerHTML = iridiums[i];
			titleWrapper.className = "title bright";
			wrapper.appendChild(titleWrapper);
		}
		return wrapper;
	}
});

