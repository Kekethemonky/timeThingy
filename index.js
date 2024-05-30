// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// My code
app.get("/api", (req,res) => {
  currentDate = new Date()
  // currentUnix = Math.floor(currentDate.getTime() / 1000)
  currentUnix = currentDate.getTime()
  currentDateFormatted = currentDate.toUTCString()

  res.json({unix: currentUnix, utc: currentDateFormatted})
})


app.get("/api/:date", (req, res) => {
  dateParam = req.params.date

  if (!isNaN(dateParam)) { // If number it will make it the unix, then turn unix to uct
    date_string = dateParam
    unixNumber = parseInt(date_string)
    uct = new Date(unixNumber) 
    uctFormatted = uct.toUTCString()
  } else {
    date_string = dateParam
    uct = new Date(date_string)
    unixNumber = uct.getTime()
    uctFormatted = uct.toUTCString()
  }
  

  if (isNaN(unixNumber)) {
    res.json({ error : "Invalid Date" })
  } else {
    res.json({unix: unixNumber, utc: uctFormatted})
  }
})


// app.get("/api/:date", (req,res) => {
//   rawPath = req.path
//   Path = rawPath.slice(5)

//   if (Path.includes("-")) {
//     theDate = new Date(Path)
//     formattedDate = theDate.toUTCString()
//     unixTimeMilliseconds = theDate.getTime()
//     // unixTime = Math.floor(unixTimeMilliseconds/1000)
//     unixTime = unixTimeMilliseconds
//   } else {
//     unixTime = parseInt(Path)
//     theDate = new Date(unixTime)
//     formattedDate = theDate.toUTCString()    
//   }

//   if (formattedDate === "Invalid Date") {
//     res.json({ error : "Invalid Date" })
//   } else {
//     res.json({unix: unixTime, utc: formattedDate})
//   }
// })
