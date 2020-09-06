import React, { useState } from "react";

type InputContainerProps = { selectCity: (prop: string) => void };

const InputContainer = ({ selectCity }: InputContainerProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <label>
      {" "}
      Here is something for you
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button onClick={(event) => selectCity(inputValue)}>Submit</button>
    </label>
  );
};

export default InputContainer;
