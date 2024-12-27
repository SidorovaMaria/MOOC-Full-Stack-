import axios from "axios";
import React from "react";
import { useState } from "react";
import personService from "../server/person";

const PersonForm = ({ setPersons, persons }) => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const OnNameSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const PersonObj = {
      name: newName,
      number: phoneNumber,
    };
    // axios.post("http://localhost:3001/persons", PersonObj).then((response) => {
    //   console.log(response.data);
    // });
    personService.create(PersonObj).then((returnedNode) => {
      setPersons((prevState) => [...prevState, returnedNode]);
    });

    setNewName("");
    setPhoneNumber("");
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
