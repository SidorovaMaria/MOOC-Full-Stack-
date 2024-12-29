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

// All persons data
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
// Get specific person
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

//Delete entry
app.delete("/api/notes/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

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

// Change number if user exist
app.put("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  const { number } = request.body;
  console.log(id, number);
  if (!number) {
    return response.status(400).json({ error: "Phone number is required" });
  }
  const update = { number };
  const options = { new: true, runValidators: true };

  Person.findByIdAndUpdate(id, update, options)
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
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

// Middleware unkown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Middleware error
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
