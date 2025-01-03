const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://sidmashav:${password}@phonebook.ai1ft.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personShema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personShema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
