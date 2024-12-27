import React from "react";

const Notification = ({ message }) => {
  return (
    <div className={`${message === null ? "" : "notify"} `}>{message}</div>
  );
};

export default Notification;
