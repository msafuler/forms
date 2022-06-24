import React, { useState } from 'react';
import Range from './Range';

export default function LinearScale(props) {

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2);

  return (
    <div className="linear-scale-container">
      <Range
        num={min}
        setNum={setMin}
        minNumber={0}
        maxNumber={1}
      />
        <span className="linear-scale-txt">to</span>
      <Range
        num={max}
        setNum={setMax}
        minNumber={2}
        maxNumber={10}
      />
    </div>
  );
};
