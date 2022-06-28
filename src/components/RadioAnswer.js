import React, { useEffect, useState } from 'react';

export default function RadioAnswer(props) {

  const modifyQuestionContent = props.modifyQuestionContent;

  const [checked, setChecked] = useState(null);

  const clickChecked = (event) => {
    setChecked(event.target.id);
  }

  // useEffect(() => {
  //   modifyQuestionContent({ options: props.options })
  // }, [props.options]);

  return (
    <div className="multiple-options-container">
      <div className="multiple-options-container">
        {props.question.content.options.map((option, index) =>
          <div key={option.id} className="multiple-options-line">
            <div className="multiple-options-row">
              <div className="multiple-options">
                <input
                  className="radio-selector"
                  type="radio"
                  id={option.id}
                  name="radio"
                  value={option.id}
                  onChange={clickChecked}
                  checked={checked === option.id}
                />
                <span className="multiple-options-txt">{option.label}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
