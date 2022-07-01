import React from 'react';

export default function RadioAnswer(props) {

  const other = "Other...";

  const isOtherSelected = props.answer.label === other;

  const clickChecked = (event) => {
    const value = event.target.value
    props.updateAnswer(
      { label: value, value: value === other ? "" : value });
  }

  const changeOtherValue = (event) => {
    props.updateAnswer({...props.answer, value: event.target.value});
  }

  return (
    <div className={`multiple-options-container ${props.className}`}>
      <div className="multiple-options-container">
        {props.question.content.options.map((option, index) =>
          <div key={option.id} className="multiple-options-line">
            <div className="multiple-options-row">
              <div className="multiple-options">
                <input
                  className="radio-selector"
                  type="radio"
                  id={option.id}
                  value={option.label}
                  onChange={clickChecked}
                  checked={props.answer.label === option.label}
                />
                <span className="multiple-options-txt">{option.label}</span>
                {isOtherSelected && option.label === other &&
                  <input
                    className="other-txt"
                    placeholder={other}
                    onChange={changeOtherValue}
                    value={props.answer.value}
                    maxLength="110"
                  />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
