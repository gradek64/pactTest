var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment')

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

const dataStore = {
  count: 1000
}

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.get('/provider', (req, res) => {
  const validDate = req.query.validDate
  const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/

  if (!validDate) {
    res.status(400)
    res.json({ error: 'validDate is required' });
  } else if (!moment(validDate, moment.ISO_8601).isValid()) {
    res.status(400)
    res.json({ error: `'${validDate}' is not a date` })
  } else {
    if (dataStore.count > 0) {
      res.json({
        'test': 'NO',
        'validDate': moment(new Date(), moment.ISO_8601).format('YYYY-MM-DDTHH:mm:ssZ'),
        'count': dataStore.count
      })
    } else {
      res.status(404)
      res.send()
    }
  }
})

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});