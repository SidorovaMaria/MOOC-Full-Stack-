import React from "react";
import personService from "../server/person";
const Persons = ({ persons, filter, setPersons }) => {
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
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
              <button onClick={() => deletePerson(person.id, person.name)}>
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
