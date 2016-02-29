var express = require('express');
var app = express();
var request = require('request');
var mp4URL='';
var binURL='';
var HashID='';

app.get('/getMP4LinkUI', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ManupulateLink', function (req, res) {
  HashID = req.query.ID;
  var RequestURL='https://api.wistia.com/v1/medias/' + HashID + '.json?api_password='Wistia Data API Password goes here';
  request(RequestURL, function (error, response, body) {
  if (!error && response.statusCode == 200)
  {
    var parsedBody = JSON.parse(body);
    binURL=parsedBody.assets[0].url;
    mp4URL = binURL.replace(".bin", "/my-file.mp4");
    res.send(mp4URL); 
  } 
  })
});

app.listen(3000, function () {
});
