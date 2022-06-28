import React, { useEffect, useState } from 'react';

export default function Checkbox(props) {

  const modifyQuestionContent = props.modifyQuestionContent;

  const [checked, setChecked] = useState([]);

  const clickChecked = (event) => {
    console.log(event.target.checked)
    if (event.target.checked) {
      addChecked(event.target.id);
    } else {
      removeChecked(event.target.id);
    }
  }

  // useEffect(() => {
  //   modifyQuestionContent({ options: props.options })
  // }, [props.options]);

  const addChecked = (id) => {
    setChecked(prevChecked => {
    const newlyChecked = [...prevChecked];
    newlyChecked.push(id);
    return newlyChecked;
    });
  }

  const removeChecked = (id) => {
    setChecked(prevChecked => {
    const newlyChecked = [...prevChecked];
      return newlyChecked.filter(item => item !== id)
    });
  };

  return (
    <div className="multiple-options-container">
      {props.question.content.options.map((option, index) =>
          <div key={option.id} className="multiple-options-line">
            <div className="multiple-options-row">
              <div className="multiple-options">
                <input
                  className="tick-checkbox"
                  type="checkbox"
                  id={option.id}
                  name="radio"
                  value={option.id}
                  onChange={clickChecked}
                  checked={checked.indexOf(option.id) !== -1}
                />
                <span className="multiple-options-txt">{option.label}</span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
