import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="toggle-btn">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} className="toggle-btn">
          cancel
        </button>
      </div>
    </div>
  );
});

export default Togglable;