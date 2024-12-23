import React from "react";
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Total = (props) => {
  return <p>Number of exercises {props.sumOfExercises}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        );
      })}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total sumOfExercises={exercises1 + exercises2 + exercises3} /> */}
    </div>
  );
};

export default Course;
