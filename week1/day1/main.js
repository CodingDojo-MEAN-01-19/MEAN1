var index;
var myString = 'some string content';

// console.log(myString);

// myString = 345;

// console.log(myString);
// //  offset    0, 1, 2
// const array = ['cat', 'dog', 'horse'];

// console.log(array.push(myString));

// console.log(array[1]);

// console.log(array.pop(1))

// console.log(array);

// console.log('index before loop', index);

// for (let index = 0; index < array.length; index++) {
//   console.log('index', index, array[index]);
// }

// console.log('index after loop', index);

// for (var element in array) {
//   console.log('element in for-in', array[element]);
// }

// for (var element of array) {
//   console.log('for-of', element);
// }


// hair eyes
// var person = ['brown', 'blue', 6];

var person = {
  hair: 'brown',
  eyes: 'blue',
  height: 6,
  key: 'thisis a key'
};

person['weight'] = 183;


for (var key in person) {
  // console.log('key', key, person[key]);
}

function sayHello(name, ...rest) {
  console.log(person);
  console.log('hello ' + name);
  console.log(`Hello ${name} -- template`);

  function another() {
    var thing = 1;
  }
}

// sayHello('Jason', true, 234234);


function counter() {
  var count = 0;

  function childScope() {
    count += 1;
    return count;
  }

  return childScope;
}

counter = counter();

console.log(counter());
// => 1

console.log(counter());
// => 2
console.log(counter());
// => 3
console.log(counter());
// => 4
console.log(counter());
// => 5
console.log(counter());
// => 6
