import React from 'react';
import { useOptions } from '../helpers/options';

export default function Checkbox(props) {

  const [options, setOptions, functions] = useOptions([{ label: "Option"}])

  const handleOtherClick = () => {
    functions.addOption({ label: "Other...", readOnly: true });
  };

  const otherExists = options.some(option => option.readOnly)

  return (
    <div className="checkbox-container">
      {options.map((option, index) =>
        <div className="checkbox-row">
          <div className="checkbox-options">
            <i className="fa-solid fa-square"></i>
            <input
              onChange={(event) => functions.changeOption({label: event.target.value}, index)}
              className="checkbox-txt"
              value={option.label}
              readOnly={option.readOnly}
            >
            </input>
          </div>
          <i
            className="fa-solid fa-xmark"
            onClick={() => functions.deleteOption(index)}
          >
          </i>
        </div>
      )}
      <div className={`add-checkbox-container ${props.isActive ? '' : 'invisible'}`}>
        <button
          onClick={() => functions.addOption({label: "Option"})}
          className="add-checkbox-button"
        >
          Add option
        </button>
        {!otherExists &&
          <>
          <span className="txt">or</span>
            <button
              onClick={handleOtherClick}
              className="add-checkbox-button other-button"
            >
              Add "Other"
            </button>
          </>
        }
      </div>
    </div>
  );
}
