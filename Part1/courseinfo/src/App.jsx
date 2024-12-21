const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Content = (props) => {
  return (
    <div>
      <Part part1={props.part1} e1={props.e1} />
      <Part part1={props.part2} e1={props.e2} />{" "}
      <Part part1={props.part3} e1={props.e3} />
    </div>
  );
};
const Part = (props) => {
  return (
    <p>
      {props.part1} {props.e1}
    </p>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>;
};
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        e1={exercises1}
        e2={exercises2}
        e3={exercises3}
      />

      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  );
};

export default App;
