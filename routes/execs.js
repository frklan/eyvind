var express = require('express');
var router = express.Router();
var fs = require("fs");
var spawn = require('child_process').spawn;


router.post('/', function(req, res, next) {
  res.setHeader("200", {'Content-Type': 'text/html', 'Transfer-Encoding': 'chunked'});
  
  if(req.baseUrl == "/syslog")
  {
    tailFile(res, "/var/log/messages");
  }
  else if(req.baseUrl == "/cupslog")
  {
    tailFile(res, "/var/log/cups/error_log");
  }
  else if(req.baseUrl == "/reboot")
  {
    sendResult(res, "rebooting");
    var cmd = spawn("sudo", ["reboot", "now"]);
  }
  else if(req.baseUrl == "/shutdown")
  {
    sendResult(res, "shutting down");
    var cmd = spawn("sudo", ["shutdown", "now"]);
  }
});

function tailFile(res, logFile) {
  msg = logFile;
    
  if(!fs.existsSync(logFile)) {
    sendResult(res, logFile + " does not exists");
    return;
  }

  sendHeader(res);
  var cmd = spawn("tail", ["-n 150", logFile]);
  cmd.on('close', function() {
    sendFooter(res);
  });

  cmd.on('error', function() {
    sendResult(res, "Error encountered");
  });

  cmd.stdout.on('data', function (data) {    
    sendLogPiece(res, data.toString());
  });
}

function sendHeader(res) {
  res.write("<html><style> body { position: relative; margin: 10; padding-bottom: 6rem;min-height: 100%;background: #2B2922;color: #eee;font-size: 14px;line-height: 1.0;text-align: left; } a {font-size: 21px; text-decoration: none; color: rgb(255, 255, 255);}</style> <body><a href=\"..\">back</a><p>");
  res.write("<pre>");
}

function sendLogPiece(res, msg) {
  res.write(msg);
}

function sendFooter(res) {
  res.write("</pre>");
  res.write("</body></html>");
  res.end();
}


function sendResult(res, msg) {
  sendHeader(res);
  res.write("<pre>" + msg + "</pre>");
  sendFooter(res);
  res.end();
}

module.exports = router;
