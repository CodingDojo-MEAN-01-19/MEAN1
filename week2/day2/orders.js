function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'A large tarp',
          directions: function () { return 'cover the floor!' }
        }
      };

      if (item in warehouse) {
        resolve(warehouse[item]);
      } else {
        reject(new Error(`${item} is out of stock`));
      }

    }, deliveryTime);
  });
}

function receivedItem(item) {
  console.log(`Received ${item.product}. Time to ${item.directions()}`);
}

const paint = orderSupplies('paint');
const brush = orderSupplies('brush');
const tarp = orderSupplies('tarp');
const roller = orderSupplies('roller').catch(handleError);

// tarp
//   .then(receivedItem)
//   .then(() => paint)
//   .then((item) => {
//     receivedItem(item);

//     return brush;
//   })
//   .then(receivedItem)
//   .then(() => roller)
//   .then(receivedItem)
//   .catch(handleError);

Promise.all([tarp, paint, brush])
  .then(items => {
    items.forEach(receivedItem);
  })
  .catch(handleError);

function handleError(error) {
  console.log(error.message);
}

// orderSupplies('paint', function (item) {
//   receivedItem(item);
//   orderSupplies('brush', receivedItem);
// });


// let havePaint = false;

// orderSupplies('paint', function (item) {
//   receivedItem(item);

//   havePaint = true;
// });

// orderSupplies('brush', function (item) {
//   if (havePaint) {
//     receivedItem(item);
//   } else {
//     const timer = setInterval(function () {
//       console.log('....checking for paint....');
//       if (havePaint) {
//         receivedItem(item);

//         clearInterval(timer);
//       }
//     }, 50);
//   }
// });

// orderSupplies('brush', handleBrush);


// function handleBrush(item) {
//   console.log('....checking for paint....', item);
//   if (havePaint) {
//     return receivedItem(item);
//   }


//   setTimeout(handleBrush, 50, item);
// }

// const items = ['tarp', 'paint', 'brush'];

// function order(items) {
//   // console.log(items);
//   const results = [];

//   for (let index = 0; index < items.length; index++) {
//     const item = items[index];
//     orderSupplies(item, function (product) {
//       // console.log('product', product);
//       results[index] = product;

//       // console.log('results', results, index);

//       if (results.filter(i => i).length === items.length) {
//         results.forEach(p => receivedItem(p));
//       }
//     });
//   }
// }

// order(items);

// const paint = new Promise(function (resolve, reject) {
//   orderSupplies('paint', resolve);
// });
// const brush = new Promise(function (resolve, reject) {
//   orderSupplies('brush', resolve);
// });
// const tarp = new Promise(function (resolve, reject) {
//   orderSupplies('tarp', resolve);
// });



// tarp
//   .then(receivedItem)
//   .then(() => paint)
//   .then(function (item) {
//     receivedItem(item);
//   })
//   .then(function () {
//     return brush;
//   })
//   .then(function (item) {
//     receivedItem(item);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
