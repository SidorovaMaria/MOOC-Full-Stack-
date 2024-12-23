import React from "react";
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Total = (props) => {
  return <p></p>;
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
      <p style={{ fontWeight: "bold" }}>
        Total of {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
        exercises
      </p>
    </div>
  );
};

export default Course;
