

function someFunction(callback) {
  console.log(callback.toString());

  if (typeof callback === 'function') {
    callback();
  }
}


// someFunction(function () {
//   console.log('inside aanon func');
// })


// function addOne(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     console.log('index', index, array[index]);
//     const number = array[index];
//     const result = number + 1;

//     console.log('result', result);

//     results.push(result);
//   }

//   return results;
// }


// function addTwo(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     console.log('index', index, array[index]);
//     const number = array[index];
//     const result = number + 2;

//     console.log('result', result);

//     results.push(result);

//   }

//   return results;
// }

function map(array, callback) {
  const results = [];

  console.log(callback)

  for (let index = 0; index < array.length; index++) {
    // console.log('index', index, array[index]);
    const result = callback(array[index], index, array);




    // console.log('result', result);

    results.push(result);

  }

  return results;
}


const numbers = [45, 8234, 734, 7865];

// console.log(addOne(numbers), numbers);
// console.log(addTwo(numbers), numbers);
// console.log(map(numbers, number => number + 2));
// console.log(map(numbers,  (number, _index, _array) => number + 1));


// const mult = a => b => c => a * b * c;

// mult(2)(3)(4)



// console.log('before');

// function sayHello(name) {
//   setTimeout(function () {
//     console.log(`Hello ${name}`);
//   }, 3000);
// }

// sayHello('Bob');


// console.log('after');


function getThingsFromDB(query, callback) {
  return setTimeout(function () {
    const data = ['thing1', 'thing2', 'thing3'];

    callback(data);

    return data;
  }, 500);

}


getThingsFromDB('select * from things;', function (things) {
  console.log('callback in the future', things);


  things.forEach(thing => console.log(`thing is ${thing}`));
 });




