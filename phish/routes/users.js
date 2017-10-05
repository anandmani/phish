var express = require('express');
var router = express.Router();
var fs = require('fs')
var http = require('http')
var request = require('request')
var querystring = require('querystring');

// console.log(request)

/* GET users listing. */
router.post('/', function (req, res, next) {

  req.headers.origin = 'https://github.com'
  req.headers.referer = 'https://github.com/'
  req.headers.host = 'https://github.com'
  // console.log("req is", req.body, req.headers)

  var options = {
    host: 'www.github.com',
    path: '/session',
    method: 'POST',
    headers: req.headers
  };

  var creq = http.request(options, function (cres) {

    console.log("response", cres)
    // set encoding
    cres.setEncoding('utf8');

    // wait for data
    cres.on('data', function (chunk) {
      console.log("data", chunk)
      res.redirect('www.github.com')
      res.write(chunk);
    });

    cres.on('close', function () {
      console.log("close")
      // closed, let's end client request as well 
      res.writeHead(cres.statusCode);
      res.end();
    });

    cres.on('end', function () {
      // finished, let's finish client request as well 
      console.log("end")
      res.writeHead(cres.statusCode);
      res.end();
    });

    cres.on('error', function (error) {
      console.log("error", error)
      res.end()
    })

  })

  creq.write(querystring.stringify(req.body))
  creq.end()



  // res.location = 'www.github.com'
  // //modify the url in any way you want
  // var newurl = 'http://github.com/session';
  // request(newurl).pipe(res);

});

module.exports = router;
