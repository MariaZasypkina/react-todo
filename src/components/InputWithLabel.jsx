import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function InputWithLabel({ id, value, onInputChange, children }) {

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    });

  return (
    <>
      <label htmlFor={id}>{children}</label>

      <input
        type="text"
        id={id}
        value={value}
        onChange={onInputChange}
        ref={inputRef}
      />
    </>
  );
}


export default InputWithLabel;
