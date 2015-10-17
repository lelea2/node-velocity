#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    port = 3000,
    url  = 'http://localhost:' + port + '/';
/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
  url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

var app = express();
app.set('port', process.env.PORT || port);
var Engine = require('velocity').Engine;
var engine = new Engine({
    template: './index.vm'
});
var receiptCanonical = require('./mock.json');
//console.log(receiptCanonical);
var result = engine.render({
  receiptCanonical: receiptCanonical,
  transactionDateTimeMMM: "Feb",
  transactionDateTimeDay: "05",
  transactionDateTimeAMPM: "10:20am",
  recommendedOffers: [
      {
      "offerImage1": "//cdn.cpnscdn.com/insight.coupons.com/COS20/_Cache/_ImageCache/079/18637079.gif",
      "offerCode": "18637079",
      "offerDescription": "when you buy TWO (2) Pine-Sol multi-purpose cleaners, 40 oz or larger",
      "offerCategory": "Household",
      "offerDisclaimer": "Disclaimer Details #1",
      "brandName": "Pine-Sol",
      "offerSummary": "SAVE $1.00 ON TWO",
      "offerId": "ea2662b3-25bf-4f6a-9a60-2d1a34691f6f",
      "offerSource": "OMS",
      "offerValue": "1.00",
      "omsCid": 18637079,
      "expiryDate": "mm/dd/yy"
      },
      {
          "offerImage1": "//cdn.cpnscdn.com/insight.coupons.com/COS20/_Cache/_ImageCache/142/18629142.gif",
          "offerCode": "18629142",
          "offerDescription": "ONE Charmin 6 Double Roll Bath Tissue (excludes trial/travel size)",
          "offerCategory": "Household",
          "offerDisclaimer": "Disclaimer Details",
          "brandName": "Charmin",
          "offerSummary": "$1.50 OFF",
          "offerId": "da3f722c-9b8c-4c50-81dc-a8258d82f915",
          "offerSource": "OMS",
          "offerValue": "1.00",
          "omsCid": 18629142,
          "expiryDate": "mm/dd/yy"
      }
    ]
});
app.set('views', __dirname);
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    //console.log(result);
    res.render('./views/index', {result: result});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log(url);
});
