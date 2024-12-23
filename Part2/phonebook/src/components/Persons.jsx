import React from "react";

const Persons = ({ persons, filter }) => {
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
            </div>
          );
        })}
    </div>
  );
};

export default Persons;
