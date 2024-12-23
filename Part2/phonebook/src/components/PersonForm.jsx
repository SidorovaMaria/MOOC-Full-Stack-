import React from "react";
import { useState } from "react";

const PersonForm = ({ setPersons, persons }) => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const OnNameSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons((prevState) => [
      ...prevState,
      { name: newName, number: phoneNumber },
    ]);
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
