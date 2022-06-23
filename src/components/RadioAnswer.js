import React from 'react';
import { useOptions } from '../helpers/options';

export default function RadioAnswer(props) {

  const [options, setOptions, functions] = useOptions([{label: "Option"}]);

  const handleOtherClick = () => {
    functions.addOption({ label: "Other...", readOnly: true });
  };

  const otherExists = options.some(option => option.readOnly)

  return (
    <div>
      <div className="radio-answers-container">
        {options.map((option, index) =>
          <div className="radio-options">
            <input
              className="radio-option"
              type="text"
              value={option.label}
              onChange={(event) => functions.changeOption({label: event.target.value}, index)}
              readOnly={option.readOnly}
            >
            </input>
            <i
              className="fa-solid fa-xmark"
              onClick={() => functions.deleteOption(index)}
            >
            </i>
          </div>
        )}
      </div>
      <div className={`add-option-container ${props.isActive ? '' : 'invisible'}`}>
        <button
          onClick={() => functions.addOption({label: "Option"})}
          className="add-option-button"
        >
          Add option
        </button>
        {!otherExists &&
          <>
            <span className="txt">or</span>
              <button
                onClick={handleOtherClick}
                className="add-option-button other-button"
              >
                Add "Other"
              </button>
            </>
          }
      </div>
    </div>
  )
}
