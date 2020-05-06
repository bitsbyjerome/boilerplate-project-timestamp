// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//API endpoint
app.get("/api/timestamp/:date_string?", function (req, res) {

  console.log(req.params.date_string);
  //parse
    let dateString = req.params.date_string;

    function isNull(dateString){
      return dateString===undefined?true:false;
    }

    let date = new Date();
    switch (isNull(dateString)) {

        case true:

            res.json(
                {
                    unix:date.getTime(),
                    utc:date.toUTCString()
                }
            );
            break;

        case false:
            date = new Date(dateString);
            res.json(
                {
                    unix:date.getTime(),
                    utc:date.toUTCString()
                }
            );
            break;
        default:
            res.json(
                {
                    unix:date.getTime(),
                    utc:date.toUTCString()
                }
            );

    }

});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});