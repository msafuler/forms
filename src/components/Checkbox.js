import React, { useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import { useOptions } from '../hooks/useOptions';

export default function Checkbox(props) {

  const [options, setOptions, functions] = useOptions(props.question.content.options)
  const modifyQuestionContent = props.modifyQuestionContent;

  useEffect(() => {
    modifyQuestionContent({ options: options })
  }, [options]);

  const handleOtherClick = () => {
    functions.addOption({ label: "Other...", readOnly: true });
  };

  const otherExists = options.some(option => option.readOnly)

  return (
    <div className="multiple-options-container">
      <ReactSortable
        list={options}
        setList={setOptions}
        animation={200}
        delayOnTouchStart={true}
        delay={2}
        handle={'.handle'}
      >
        {options.map((option, index) =>
          <div key={option.id} className="multiple-options-line">
            <i className={`fa-solid fa-braille handle radio ${props.isActive ? '' : 'hidden'}`}></i>
            <div className="multiple-options-row">
              <div className="multiple-options">
                <i className="fa-solid fa-square"></i>
                <input
                  onChange={(event) => functions.changeOption({label: event.target.value}, index)}
                  className={`multiple-options-txt ${props.isActive ? 'line' : ''}`}
                  value={option.label}
                  readOnly={option.readOnly}
                />
              <i
                className={`fa-solid fa-xmark ${props.isActive ? '' : 'hidden'}`}
                onClick={() => functions.deleteOption(index)}
              >
              </i>
              </div>
            </div>
          </div>
        )}
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
      </ReactSortable>
    </div>
  );
}
