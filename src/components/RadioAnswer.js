import React from 'react';
import { ReactSortable } from "react-sortablejs";
import { useOptions } from '../helpers/options';
import { v4 as uuidv4 } from "uuid";

export default function RadioAnswer(props) {

  const [options, setOptions, functions] = useOptions([{ label: "Option", id: uuidv4() }]);

  const handleOtherClick = () => {
    functions.addOption({ label: "Other...", readOnly: true });
  };

  const otherExists = options.some(option => option.readOnly)

  return (
    <div>
      <div className="radio-answers-container">
        <ReactSortable
          list={options}
          setList={setOptions}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          handle={'.handle'}
        >
          {options.map((option, index) =>
            <div key={option.id} className="radio-line">
              <i className={`fa-solid fa-braille handle radio ${props.isActive ? '' : 'hidden'}`}></i>
              <div className="radio-row">
                <div className="radio-options">
                  <i className="fa-solid fa-circle-dot"></i>
                  <input
                    className={`radio-txt ${props.isActive ? 'line' : ''}`}
                    type="text"
                    value={option.label}
                    onChange={(event) => functions.changeOption({label: event.target.value}, index)}
                    readOnly={option.readOnly}
                  />
                  <i
                    className={`fa-solid fa-xmark ${props.isActive ? '' : 'hide'}`}
                    onClick={() => functions.deleteOption(index)}
                  >
                  </i>
                </div>
              </div>
            </div>
          )}
        </ReactSortable>
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
