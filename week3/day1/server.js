const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const logger = require('./server/middleware/logger');
const port = process.env.PORT || 8000;
const app = express();

console.log(logger);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use(function (request, response, next) {
  console.log(next);
  next();
});

function adminCheck(request, response, next) {

  next(new Error('not an admin'));
}

const names = ['Sally', 'George', 'Bob2'];


app.get('/', function (request, response) {

  // console.log('hello from express');

  response.render('index');
});


app.post('/names', function (request, response) {
  console.log('posting names', request.body);

  names.push(request.body.name);

  response.render('names', { name: request.body.name, names });

  // response.redirect('/');
});

app.get('/names/:index', function (request, response) {
  console.log(request.params);
  response.send(names[request.params.index]);
});

app.use(function (error, request, response, next) {
  console.log('log error to data', error.message);

  next(error);
});

app.use(function (error, request, response, next) {
  response.send('something went wrong: ' + error.message);
});


app.listen(port, () => console.log(`Express server listening on port ${port}`));

