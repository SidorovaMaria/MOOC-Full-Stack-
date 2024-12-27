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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                alignItems: "center",
                gap: "1px",
              }}
            >
              <p>{person.name}</p>
              <p> {person.number}</p>
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
