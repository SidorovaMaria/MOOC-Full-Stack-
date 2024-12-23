import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      <h2>Phonebook</h2>
      <div>
        <p>Filter shown with</p>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>Add new person</h2>
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
      <h2>Numbers</h2>

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

export default App;
