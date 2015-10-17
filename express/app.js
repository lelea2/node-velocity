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
  transactionDateTimeDay: "05"
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
