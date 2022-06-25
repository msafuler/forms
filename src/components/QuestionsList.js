import React, { useRef } from 'react';
import { useClickOutside } from './useClickOutside';

export default function QuestionsList(props) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useClickOutside(dropdownRef, false);

  const toggleOptions = () => {
    setOpen(current => !current)
  };

  const selectedQuestionType = props.questionTypes[props.selectedIndex]

  return (
    <div className={`dropdown-container ${props.isActive ? '' : 'hidden'}`}>
      <button
        className="question-options-button"
        onClick={toggleOptions}
        ref={dropdownRef}
      >
        <span className="question-type">
          <i className={selectedQuestionType.className}></i>
          {selectedQuestionType.label}
          <i className="fa-solid fa-sort-down"></i>
        </span>
      </button>
      <nav
        className={`dropdown ${open ? 'active' : 'inactive'}`}>
        <ul className="question-list">
          {props.questionTypes.map((questionType, i) =>
            <li
              key={questionType.id}
              onClick={() => props.changeQuestionType(i)}
              className={`question-option ${selectedQuestionType === questionType ? 'selectedType' : ''}`}
            >
              <i className={questionType.className}></i>
              {questionType.label}
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
