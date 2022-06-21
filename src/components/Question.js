import React, {useState} from 'react';

export default function Question(props) {

  const [required, setRequired] = useState(false);

  const modifyQuestionTxt = (event) => {
    props.updateQuestion(event.target.value);
  };

  const toggleRequire = (event) => {
    setRequired(current => !current)
  };

  return (
    <div
      className={`question-form-container ${props.isActive ? 'inFocus' : 'outOfFocus'}`}
      onClick={() => props.toggleActive()}
    >
      <div className="first-line">
        <input
          className="question-form"
          placeholder="Question"
          type="text"
          onChange={modifyQuestionTxt}
          maxLength="100"
        />
        <button className="question-options">Button</button>
      </div>
      <div className="question-icons">
        <i
          className={`fa-solid fa-trash-can ${props.isActive ? '' : 'hiden'}`}
          onClick={() => props.deleteQuestion()}
        >
        </i>
        <div
          className={`required-button ${props.isActive ? '' : 'hiden'}`}
          onClick={() => toggleRequire()}
        >
          <i className={`fa-solid fa-circle ${required ? 'require-active' : ''}`}></i>
        </div>
      </div>
    </div>
  )
}
