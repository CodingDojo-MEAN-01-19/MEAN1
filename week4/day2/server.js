const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
const { Schema } = mongoose;
const { PORT: port = 8000 } = process.env;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/authors_books', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('connected to mongodb'));


const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'provide an author name'],
    trim: true,
  },
  age: Number,
  isAlive: {
    type: Boolean,
    default: true
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  pages: {
    type: Number,
    min: 1,
    required: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  year: Number,
  publisher: String
});


const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

app.get('/authors', function (request, response) {
  Author.find({})
    .populate('books')
    .then(authors => {
      response.render('authors/index', { authors });
    })
    .catch(console.log);
});

app.get('/authors/new', function (request, response) {
  response.render('authors/new');
});

app.post('/authors', function (request, response) {
  console.log(request.body)
  Author.create(request.body)
    .then(author => {
      console.log(author);
      response.redirect('/authors');
    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);

      console.log(errors);

      throw error;
    });
});



app.get('/books', function (request, response) {
  Book.find({})
    .populate('author')
    .then(books => response.render('books/index', { books }))
    .catch(console.log);
});

app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => response.render('books/new', { authors }))
    .catch(console.log)
});

app.post('/books', function (request, response) {
  console.log(request.body);
  Book.create(request.body)
    .then(book => {
      console.log(book);

      return Author.findById(book.author)
        .then(author => {
          console.log(author);

          author.books.push(book._id);

          return author.save();
        })
        .then(() => {
          response.redirect('/books');
        });
    })
    .catch(console.log);
});

app.listen(port, () => console.log(`express listening on port ${port}`));
