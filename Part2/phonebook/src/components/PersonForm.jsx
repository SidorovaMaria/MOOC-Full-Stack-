import axios from "axios";
import React from "react";
import { useState } from "react";
import personService from "../server/person";

const PersonForm = ({ setPersons, persons }) => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const OnNameSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: phoneNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((updatedData) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedData : person
              )
            );
            setNewName("");
            setPhoneNumber("");
          });
      }
    } else {
      const PersonObj = {
        name: newName,
        number: phoneNumber,
      };
    }
    personService.create(PersonObj).then((returnedNode) => {
      setPersons((prevState) => [...prevState, returnedNode]);
      setNewName("");
      setPhoneNumber("");
    });

    // axios.post("http://localhost:3001/persons", PersonObj).then((response) => {
    //   console.log(response.data);
    // });
  };

  return (
    <div>
      <form onSubmit={(e) => OnNameSubmit(e)}>
        <div>
          Name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Phone Number:
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
