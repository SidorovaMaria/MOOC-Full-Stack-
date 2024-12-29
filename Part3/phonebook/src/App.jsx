import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";
import "./index.css";
import { useEffect } from "react";
import personService from "./server/person";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    personService.getAll().then((ininitialNotes) => {
      setPersons(ininitialNotes);
    });
  }, []);

  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <div>
        <Filter filter={filter} setFilter={setFilter} />
      </div>

      <h2>Add new person</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />

      <h2>Numbers</h2>

      <Persons filter={filter} setPersons={setPersons} persons={persons} />
    </div>
  );
};

export default App;
