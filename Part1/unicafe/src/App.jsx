import { useState } from "react";

const Button = (props) => {
  const handleClick = () => {
    const newReview = props.review + 1;
    props.setTotal(props.total + 1);
    props.setReview(newReview);
    switch (props.text) {
      case "Good":
        props.setScore(props.score + 1);
        break;
      case "Neutral":
        props.setScore(props.score + 0);
        break;
      case "Bad":
        props.setScore(props.score - 1);
        break;
    }
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
      {props.text}
    </button>
  );
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr style={{ fontWeight: "500", margin: "2px" }}>
      <td>{text}</td>
      <td style={{ fontWeight: "bold" }}>{value}</td>
    </tr>
  );
};

const Statistics = ({ total, score, good, bad, neutral }) => {
  if (!total) {
    return (
      <p style={{ fontWeight: "500", margin: "2px" }}>No Feedback given</p>
    );
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="Good:" value={good} />
          <StatisticLine text="Neutral:" value={neutral} />
          <StatisticLine text="Bad:" value={bad} />
          <StatisticLine text="Average:" value={score / total || 0} />

          <StatisticLine
            text="Positive:"
            value={(good / total) * 100 + "%" || 0}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const handleGoodReview = () => {
    setReview(good + 1);
  };
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1> Give Feedback</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          setReview={setGood}
          setTotal={setTotal}
          setScore={setScore}
          score={score}
          total={total}
          review={good}
          text="Good"
        />
        <Button
          setReview={setNeutral}
          setTotal={setTotal}
          total={total}
          setScore={setScore}
          score={score}
          review={neutral}
          text="Neutral"
        />
        <Button
          setReview={setBad}
          setTotal={setTotal}
          total={total}
          setScore={setScore}
          score={score}
          review={bad}
          text="Bad"
        />
      </div>
      <h2>Statistics</h2>
      <div
        style={{ display: "flex", gap: "2px", flexDirection: "column" }}
      ></div>

      <Statistics
        total={total}
        score={score}
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </div>
  );
};

export default App;
