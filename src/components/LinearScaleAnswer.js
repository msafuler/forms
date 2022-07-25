import React from 'react';
import { v4 as uuidv4 } from "uuid";
import range from "../helpers/range";

export default function LinearScale(props) {

  const content = props.question.content
  const arrNum = [];
  const arrIcons = [];

  const chooseNumber = (event) => {
    props.updateAnswer({value: parseInt(event.target.value, 10)});
  }

  const numbers = range(content.min, content.max).map(number => {
    return (
      <span className="linear-scale-preview-num" key={uuidv4()}>
        {number}
      </span>
    );
  });

  const icons = range(content.min, content.max).map(icon => {
    return (
      <label className="linear-scale-container noshow answer" key={uuidv4()}>
        <input
          className="linear-radio-selector"
          type="radio"
          value={icon}
          onChange={chooseNumber}
          checked={props.answer.value === icon}
        />
      </label>
    );
  });

  const clearNumber = () => {
    props.updateAnswer({value: -1});
  }

  return (
    <div className={props.className}>
      <div className="linear-scale-preview-hidden linear-scale-preview-answer">
        <span>{content.minLabel}</span>
        <div className="linear-scale-main">
          <div className="linear-scale-container noshow">
            {numbers}
          </div>
          <div className="linear-scale-container noshow">
            {icons}
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
