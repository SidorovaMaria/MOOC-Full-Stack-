const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const cors = require("cors");
const Person = require("./models/person");
app.use(cors());
app.use(express.json());

morgan.token("body", (req) => {
  // Only log body for POST requests (to avoid logging in every request)
  if (req.method === "POST") {
    return JSON.stringify(req.body); // Log the request body as a string
  }
  return ""; // For non-POST requests, return an empty string
});
app.use(morgan(":method :url :status :response-time ms - :body"));

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
//   {
//     id: "5",
//     name: "Maria Sidorova",
//     number: "20-23-6423122",
//   },
// ];

const generateId = () => {
  return Math.floor(Math.random() * 1000000000); // Generate a random ID between 0 and 1 billion
};

// All persons data
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
// Get specific person
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      // response.status(500).end();
      response.status(400).send({ error: "malformatted id" });
    });
});

// Delete entry
// app.delete("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// Create new entry
app.post("/api/persons", (request, response) => {
  const body = request.body;
  //if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Missing content",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

//Get Info
app.get("/info", (request, response) => {
  const date = new Date();
  Person.find({})
    .then((persons) => {
      response.send(
        `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
      );
    })
    .catch((error) => {
      console.error("Error fetching persons:", error);
      response.status(500).send("Error retrieving data");
    });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
