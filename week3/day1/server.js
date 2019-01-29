const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));


const names = ['Sally', 'George', 'Bob2'];

app.get('/', function (request, response) {

  console.log('hello from express');

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

app.listen(port, () => console.log(`Express server listening on port ${port}`));

