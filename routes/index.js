var express = require('express');
var router = express.Router();
var fs = require("fs");
var lpstat = require('child_process');

router.get('/', function(req, res) {
  var html = buildIndexHtml(req);
  res.setHeader("200", {'Content-Type': 'text/html', 'Transfer-Encoding': 'chunked'});
  res.end(html);
});

function buildIndexHtml(req) {
  var printers = getPrinters();
  var queueLog = getQueue(printers);
  var body = "<pre>" + queueLog + "</pre>";

  return getFilledTemplate(queueLog);
};

function getFilledTemplate(log) {
  let template = String( fs.readFileSync("static/index.html"));

  if(template.length < 10)
  {
    return "Server error";
  }
  var html = template.replace("$PRINTER_LOG", log);
  return html;
}

function getPrinters() {
  var lines = lpstat.execSync('lpstat -p', {timeout:5000}).toString().match((/[^\r\n]+/g));
  var printers = new Array();  

  for (var i = 0; i < lines.length; i++) {
    var words = lines[i].split(" ");
    if(words[0] == "printer" || words[0] == "skrivare")
    {
      printers.push(words[1]);
    }
  }
  return printers;
}

// get jobs for all printer
function getQueue(printers) {
  
  var queueLog = "";

  for(var p = 0; p < printers.length; p++)
  {
    var queue = lpstat.execSync('lpstat -l -o ' + printers[p] , {timeout:5000});
    
    // remove tab
    queue = String(queue).split('\t').join('');
    // ..and multiple spaces
    queue = String(queue).replace(/  +/g, ' ');
    
    
    queueLog += "==== queue for '" + printers[p] + "' ====\n";
    queueLog += queue + "\n\n";
  }
  return queueLog;
}

module.exports = router;