import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import Range from './Range';

export default function LinearScale(props) {

  const content = props.question.content
  const [min, setMin] = useState(content.min);
  const [max, setMax] = useState(content.max);
  const [minLabel, setMinLabel] = useState(content.minLabel);
  const [maxLabel, setMaxLabel] = useState(content.maxLabel);
  const modifyQuestionContent = props.modifyQuestionContent;

  const arrNum = [];
  const arrIcons = [];

  for (let i = min; i <= max; i++) {
    arrNum.push(<span className="linear-scale-preview-num" key={uuidv4()}>{i}</span>)
  }

  for (let i = min; i <= max; i++) {
    arrIcons.push(<i className="fa-solid fa-circle" key={uuidv4()}></i>)
  }

  useEffect(() => {
    modifyQuestionContent({ min, max, minLabel, maxLabel })
  }, [min, max, minLabel, maxLabel]);

  return (
    <div>
      <div className={`linear-scale-preview-hidden ${!props.isActive ? '' : 'no-show'}`}>
        <div className="linear-scale-container noshow">
          {arrIcons}
        </div>
        <div className="linear-scale-container noshow">
          {arrNum}
        </div>
      </div>
      <div className={`${props.isActive ? '' : 'no-show'}`}>
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
        <div className="linear-scale-range-info">
          <span>{min}</span>
          <input
            placeholder="Label (optional)"
            onChange={(event) => setMinLabel(event.target.value)}
            className={`linear-scale-range-label ${props.isActive ? 'line' : ''}`}
            value={minLabel}
          />
        </div>
        <div className="linear-scale-range-info">
          <span>{max}</span>
          <input
            placeholder="Label (optional)"
            onChange={(event) => setMaxLabel(event.target.value)}
            className={`linear-scale-range-label ${props.isActive ? 'line' : ''}`}
            value={maxLabel}
          />
        </div>
      </div>
    </div>
  );
};
