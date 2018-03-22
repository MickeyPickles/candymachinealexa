const querystring = require('querystring');
const https = require('https');


var response = "not set"

var postData = querystring.stringify({
    'access_token' : '7f274f9a34a07c2f9b153768ac27a9dfaab9b006',
    'arg' : '4000'
});

var options = {
  hostname: 'api.particle.io',
  port: 443,
  path: '/v1/devices/280046000d47353136383631/giveCandy',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
  }
};

// var req = https.request(options, function(res) {
//   console.log('Status: ' + res.statusCode);
//   console.log('Headers: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (body) {
//     console.log('Body: ' + body);
//     response = body+"";
//   });
// });

function initRequest() {
  var tempReq = https.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
      response = body+"";
    });
  });

  tempReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  return tempReq;
}



//for when running on command line
// var req = initRequest();
// req.write(postData);
// req.end();

exports.handler = (event, context, callback) => {
    // write data to request body
    var req = initRequest();
    req.write(postData);
    req.end();
    //callback(null, "data= "+response);

    // TODO implement

};
