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

    //get params
    let dateString = req.params.date_string;

    //check if param is null
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
          //get timestamp or date from dateString
            let dateParse = Date.parse(dateString);




            console.log('dateParse: '+ dateParse);
            //if we can't get timestamp it's already a timestamp or an invalid date

            //is it a timestamp or date ?
            if(dateString.length > 10 && dateString <14){
              //it's a timestamp
                //if it's a valid timestamp
                date = new Date(parseInt(dateString));
                //date = new Date(parseInt(dateString));
                console.log('valid timestamp')
                console.log(date.getTime());
                res.json(
                    {
                        unix:date.getTime(),
                        utc:date.toUTCString()
                    }
                );

            }else{

              //is it a valid date or not?
                if(isNaN(dateParse)){
                    //invalid date
                        console.log('invalid date')
                        //date = dateString;
                        res.json(
                            {
                                error:"Invalid Date"
                            }
                        );
                }else{
                    //if it's a valid date
                    date = new Date(dateString);
                    res.json(
                        {
                            unix:date.getTime(),
                            utc:date.toUTCString()
                        }
                    );
                }
            }

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