const querystring = require('querystring');
const https = require('https');


var ledColors = {
  'blue' : '0,0,255',
  'red' : '255,0,0',
  'yellow' : '255,255,0',
  'green' : '0,255,0',
  'purple' : '255,0,250',
  'white' : '255,255,255',
  'pink' : '255,153,255',
  'orange' : '255,128,0',
  'off' : 'OFF'
};

var postData = {
    'access_token' : '7f274f9a34a07c2f9b153768ac27a9dfaab9b006',
    'arg' : '1000'
};

var options = {
  hostname: 'api.particle.io',
  port: 443,
  path: '/v1/devices/280046000d47353136383631/giveCandy',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': querystring.stringify(postData).length
  }
};

function initRequest() {
  var tempReq = https.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
    });
  });

  tempReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  return tempReq;
}


module.exports = {
  dispenceCandy: function (size, callback) {
    // whatever
    console.log("here comes candy size : " + size);
    var validInput = false;

    if (size == 'large' || size == 'medium' || size == 'small') {
      validInput = true;
    }
    if(!validInput) {
      callback(false);
    } else {
      if(size == "small") {
        postData.arg = '500'
      } else if(size == "large") {
        postData.arg = '2000'
      } else {
        //but be medium
        postData.arg = '1000'
      }
      options.headers['Content-Length'] = querystring.stringify(postData).length
      options.path = '/v1/devices/280046000d47353136383631/giveCandy'
      var req = initRequest();
      console.log("Posting this : " + querystring.stringify(postData));
      console.log("content length : " + options.headers['Content-Length'])
      req.write(querystring.stringify(postData));
      req.end();
      callback(true);
    }
  },
  lightLed:  function(color, callback) {
    // whatever
    var validInput = false;
    var colorString = ledColors[color];
    console.log("colorstring = " + colorString);
    if(colorString) {
      postData.arg = colorString
      options.headers['Content-Length'] = querystring.stringify(postData).length
      options.path = '/v1/devices/280046000d47353136383631/lightLED'
      var req = initRequest();
      req.write(querystring.stringify(postData));
      req.end();
      callback(true);
    } else {
      callback(false);
    }
  }
};
