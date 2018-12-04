const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 9123 || process.env.API_PORT
//node native http module;
const http = require('http');


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  //U can set general header here;
  res.header('Content-Type', 'application/text; charset=utf-8')
  next()
})

app.get('/', (req, res) => {
  res.write('index page loaded!')
});

app.get('/json', (req, res) => {
  //header for this route
    res.header('Content-Type', 'application/text; charset=utf-8')
  //response
  res.json({ status: 'running' });
});

app.set('port', port);
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Provider Service listening on http://localhost:${port}`)
})
