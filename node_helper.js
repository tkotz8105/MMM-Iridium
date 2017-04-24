'use strict';

/* Magic Mirror
 * Module: MMM-Iridium
 *
 * By Tom Kotz
 *
 */

const NodeHelper = require('node_helper');
// var async = require('async');
// var sys = require('sys');
// var exec = require('child_process').exec;
const request = require('request');
const cheerio = require("cheerio");

// Constants
// const URL = 'http://192.168.1.131/HeavensAbove.html';  // used for testing
const URL = 'http://www.heavens-above.com/IridiumFlares.aspx?lat=35.6971&lng=-82.5607&loc=Weaverville&alt=664&tz=EST';
module.exports = NodeHelper.create({

  start: function() {
    console.log('Starting node helper: ' + this.name);
	this.started = false;
  },

  // Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG') {
			var self = this;
			this.config = payload;
			self.retrieveAndUpdate();
			setInterval(function() {
				self.retrieveAndUpdate();
			}, this.config.updateInterval);
			console.log("MMM-Iridium Updating Every ", this.config.updateInterval/60000," Minutes");
		}
	},

	retrieveAndUpdate: function() {
		var self = this;
		let hdspc=String.fromCharCode(160);
		let hdspc2=hdspc.concat(hdspc);
		let hdspc3=hdspc2.concat(hdspc);
		let hdspc4=hdspc3.concat(hdspc);
		console.log("MMM-Iridium Retrieving Sitings......");
		request(URL, function (err, response, body) {
			if (!err && response.statusCode == 200) {
				var allIridiums = [];
				allIridiums.push(hdspc.concat("DATE", hdspc4,"TIME",hdspc2,"MAG", hdspc,"ALT"));
				var num = 0;
				var datetime, brightness, altitude, azimuth, satellite, distanceflare, brightnessflare;
				let $ = cheerio.load(body);  //use for web url
				$('tr.clickableRow td').each(function(i, element) {
					var a = $(this);
					num = num + 1;
					var mod = num % 8;
					if (mod === 1) {
						datetime = a.text();
					} else if (mod === 2) {
						brightness = a.text();
					} else if (mod === 3) {
						altitude = a.text();
					} else if (mod === 4) {
						azimuth = a.text();
					} else if (mod === 5) {
						satellite = a.text();
					} else if (mod === 6) {
						distanceflare = a.text();
					} else if (mod === 7) {
						brightnessflare = a.text();
					} else if (mod === 0){
						if (parseFloat(brightness) <= -1.0) {
							// console.log(datetime.substring(0, 6), datetime.substring(7, 13), brightness, altitude, azimuth, satellite, distanceflare, brightnessflare);
							allIridiums.push(datetime.substring(0, 6).concat(hdspc,hdspc,datetime.substring(7, 13), hdspc, hdspc, brightness, hdspc, hdspc, altitude));
						}
					}
				 });
			console.log("....", allIridiums.length + " Iridium sitings retrieved.");
//			console.log(allIridiums);

			self.sendSocketNotification('IRIDIUMS', allIridiums);
		}
	  });
	}
});
