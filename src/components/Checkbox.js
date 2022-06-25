import React from 'react';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import { useOptions } from '../helpers/options';

export default function Checkbox(props) {

  const [options, setOptions, functions] = useOptions([{ label: "Option", id: uuidv4()}])

  const handleOtherClick = () => {
    functions.addOption({ label: "Other...", readOnly: true, id: uuidv4() });
  };

  const otherExists = options.some(option => option.readOnly)

  return (
    <div className="checkbox-container">
      <ReactSortable
        list={options}
        setList={setOptions}
        animation={200}
        delayOnTouchStart={true}
        delay={2}
        handle={'.handle'}
      >
        {options.map((option, index) =>
          <div key={option.id} className="checkbox-line">
            <i className={`fa-solid fa-braille handle radio ${props.isActive ? '' : 'hidden'}`}></i>
            <div className="checkbox-row">
              <div className="checkbox-options">
                <i className="fa-solid fa-square"></i>
                <input
                  onChange={(event) => functions.changeOption({label: event.target.value}, index)}
                  className={`checkbox-txt ${props.isActive ? 'line' : ''}`}
                  value={option.label}
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
      </ReactSortable>
    </div>
  );
}
