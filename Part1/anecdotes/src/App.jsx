import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [Allvotes, setAllvotes] = useState(
    anecdotes.map((a) => {
      return {
        anecdote: a,
        votes: 0,
      };
    })
  );

  const [selected, setSelected] = useState(0);

  const onClick = () => {
    let randomA;
    do {
      randomA = Math.floor(Math.random() * anecdotes.length);
    } while (randomA === selected);
    setSelected(randomA);
  };
  const onVote = () => {
    setAllvotes((prevVotes) =>
      prevVotes.map((item, index) =>
        index === selected ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };
  return (
    <div>
      <h2>{Allvotes[selected].anecdote}</h2>
      <h4>Has {Allvotes[selected].votes} votes</h4>
      <div>
        <button onClick={onClick}>Next Anecdote</button>
        <button onClick={onVote}>Vote</button>
      </div>
    </div>
  );
};

export default App;
