import { useState } from "react";

const Button = ({ setReview, review, text }) => {
  const handleClick = () => {
    setReview(review + 1);
  };
  return (
    <button
      style={{
        backgroundColor: "white",
        border: "solid 1px black",
        borderRadius: "5px",
        padding: "3px 6px",
      }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> Give Feedback</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button setReview={setGood} review={good} text="Good" />
        <Button setReview={setNeutral} review={neutral} text="Neutral" />
        <Button setReview={setBad} review={bad} text="Bad" />
      </div>
      <h2>Statistics</h2>
      <div style={{ display: "flex", gap: "2px", flexDirection: "column" }}>
        <p style={{ fontWeight: "500", margin: "2px" }}>
          Good: <span style={{ fontWeight: "bold" }}>{good}</span>
        </p>
        <p style={{ fontWeight: "500", margin: "2px" }}>
          Neutral: <span style={{ fontWeight: "bold" }}>{neutral}</span>
        </p>
        <p style={{ fontWeight: "500", margin: "2px" }}>
          Bad: <span style={{ fontWeight: "bold" }}>{bad}</span>
        </p>
      </div>
    </div>
  );
};

export default App;
