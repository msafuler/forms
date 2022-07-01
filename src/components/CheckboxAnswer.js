import React from 'react';

export default function CheckboxAnswer(props) {
  const other = "Other..."

  console.log(props.answer)
  const otherIndex = props.answer.label.findIndex(label =>
    label === other);

  const isOtherSelected = props.answer.label.findIndex(label =>
    label === other) >= 0;

  const clickChecked = (event) => {
    if (event.target.checked) {
      addChecked(event.target.value);
    } else {
      removeChecked(event.target.value);
    }
  }

  const changeOtherValue = (event) => {
    const newlyChecked = [...props.answer.value];
    newlyChecked[otherIndex] = event.target.value;
    const newLabels = [...props.answer.label];
    newLabels[otherIndex] = other;
    props.updateAnswer({ ...props.answer, value: newlyChecked });
  }

  const addChecked = (id) => {
    const newlyChecked = [...props.answer.value, id === other ? '' : id];
    const newLabels = [...props.answer.label, id];
    props.updateAnswer({ ...props.answer, label: newLabels, value: newlyChecked });
  }

  const removeChecked = (id) => {
    const newLabels = [...props.answer.label];
    const newlyChecked = [...props.answer.value];

    const index = props.answer.label.findIndex(item => item === id)
    newLabels.splice(index, 1)
    newlyChecked.splice(index, 1)

    props.updateAnswer({ label: newLabels,  value: newlyChecked });
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
                  value={option.label}
                  onChange={clickChecked}
                  checked={props.answer.label.indexOf(option.label) !== -1}
                />
                <span className="multiple-options-txt">{option.label}</span>
                {isOtherSelected && option.label === other &&
                <input className="other-txt" placeholder={other} onChange={changeOtherValue} value={props.answer.value[otherIndex]} />}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
