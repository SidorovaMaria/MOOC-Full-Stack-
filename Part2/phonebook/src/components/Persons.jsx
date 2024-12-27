import React from "react";
import personService from "../server/person";
const Persons = ({ persons, filter, setPersons }) => {
  const deletePerson = (id) => {
    if (window.confirm("Do you really want to delete the user?")) {
      personService
        .deleteObj(id)
        .then(setPersons(persons.filter((n) => n.id !== id)));
      alert("succefully deleted!");
    } else {
      return;
    }
  };

  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person, index) => {
          return (
            <div key={index}>
              <p>
                {person.name} - <span>{person.number}</span>
              </p>
              <button onClick={() => deletePerson(person.id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
