import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

export default function LinearScale(props) {

  const content = props.question.content
  const [number, setNumber] = useState(-1);
  const arrNum = [];
  const arrIcons = [];

  const chooseNumber = (event) => {
    setNumber(parseInt(event.target.value, 10));
  }

  for (let i = content.min; i <= content.max; i++) {
    arrNum.push(<span className="linear-scale-preview-num" key={uuidv4()}>{i}</span>)
  }
  for (let i = content.min; i <= content.max; i++) {
    arrIcons.push(
      <label className="linear-scale-container noshow answer" key={uuidv4()}>
        <input
          className="linear-radio-selector"
          type="radio"
          name="radio"
          value={i}
          onChange={chooseNumber}
          checked={number === i}
        />
      </label>
    )
  }

  // useEffect(() => {
  //   modifyQuestionContent({ min, max, minLabel, maxLabel })
  // }, [min, max, minLabel, maxLabel]);

  const clearNumber = () => {
    setNumber(-1);
  }

  return (
    <div>
      <div className="linear-scale-preview-hidden linear-scale-preview-answer">
        <span>{content.minLabel}</span>
        <div className="linear-scale-main">
          <div className="linear-scale-container noshow">
            {arrNum}
          </div>
          <div className="linear-scale-container noshow">
            {arrIcons}
          </div>
        </div>
        <span>{content.maxLabel}</span>
      </div>
      <div className="clear-box">
        <span className="clear-selection" onClick={clearNumber}>Clear selection</span>
      </div>
    </div>
  );
};
