import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";
import { useEffect } from "react";
import personService from "./server/person";
const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  useEffect(() => {
    personService.getAll().then((ininitialNotes) => {
      setPersons(ininitialNotes);
    });
  }, []);

  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} setFilter={setFilter} />
      </div>

      <h2>Add new person</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>

      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
