

function Person(name, items) {
  if (!(this instanceof Person)) {
    return new Person(name, items);
  }

  this.name = name;

  this.items = items;
}

Person.prototype.take = function take(item, target) {
  console.log('persona calling', this.name);
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target must have items array');
  }

  for (let index = 0; index < target.items.length; index++) {
    console.log('index.', index, target.items[index]);

    if (item === target.items[index]) {
      console.log('found item at index', item, index);

      target.items.splice(index, 1);

      this.items.push(item);

      // console.log('items', target.items);

      // slice - makes a copy
      // splice -- mutates array

      return true;
    }
  }

  return false;
}


const person1 = Person('Bob', ['gold', 'crackers', 'lint']);
const person2 = new Person('Sally', ['phone', 'money', 'cat']);

console.log('person', person1);
console.log('person', person2);

person2.take('gold', person1);
person1.take('gold', person2);



// take('gold', person1);



// console.log(1 === '1');


console.log('person', person1);
console.log('person', person2);

const backpack = {
  items: ['compass', 'snacks', 'map']
};



person1.take('snacks', backpack);

console.log('person', person1);
console.log('back', backpack);

// backpack.take = person1.take;

// console.log(backpack);


person2.take.call(backpack, 'gold', person1);

console.log('person', person1);
console.log('person', person2);
console.log('back', backpack);
