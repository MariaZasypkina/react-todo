import React, {useRef, useEffect} from "react";


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
