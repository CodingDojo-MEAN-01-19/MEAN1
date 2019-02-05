const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/animals', {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => console.log('Mongodb connected'));


const AnimalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  age: Number,
  legs: {
    type: Number,
    required: [true, 'you need legs...'],
    min: [0, 'can not have less than 0 legs']
  },
  isPet: {
    type: Boolean,
    required: true,
    default: true
  },
},
  {
    timestamps: {
      createdAt: 'created_at'
    }
});

// Animal => animals
const Animal = mongoose.model('Animal', AnimalSchema);

const animal = new Animal({
  name: 'shags',
  age: 3,
  legs: 2,
});


animal.save()
  .then(pet => console.log(pet))
  .catch(error => {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message);

    // for (let index = 0; index < keys.length; index++) {
    //   errors.push( error.errors[keys[index]].message);
    // }

    console.log(errors);
  });
