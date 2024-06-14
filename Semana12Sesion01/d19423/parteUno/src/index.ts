let firstName: string = "Dylan";
let lastName = "Bob";

//firstName = 33;
const json = JSON.parse("55");
console.log(typeof json);

const names: string[] = [];
names.push("Dylan"); // no error
names.push(33);

const names2: readonly string[] = ["Dylan"];
names2.push("Jack");

const numbers = [1, 2, 3]; // inferred to type number[]
numbers.push(4); // no error
numbers.push("3")


function add(a: number, b: number, c?: number) {
    return a + b + (c || 0);
  }



// define our tuple
let ourTuple: [number, boolean, string, boolean];

// initialize correctly
ourTuple = [5, false, 'Coding God was here',true];

const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
  };

  const car2 = {
    type: "Toyota",
  };
  car2.type = "Ford"; // no error
  car2.type = 2; // Error: Type 'number' is not assignable to type 'string'.

  const car3: { type: string, mileage?: number } = { // no error
    type: "Toyota"
  };
  car3.mileage = 2000;