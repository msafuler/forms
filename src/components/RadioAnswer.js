import React, { useState } from 'react';

export default function RadioAnswer() {

  const [options, setOptions] = useState(["Option 1"]);
  const changeOption = (e) => {
    setOptions(previousOptions) => {
      [...previousOptions]
    };
  };

  return (
    <div>
      {options.map(option =>
        <input type="text" value={option} onChange={() =>}>
        </input>
      )}
    </div>
  )
}
