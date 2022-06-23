import React, { useState } from 'react';
import questionTypes from '../data/questionTypes'
import QuestionsList from './QuestionsList';
import RadioAnswer from './RadioAnswer';
import Checkbox from './Checkbox';

export default function QuestionForm(props) {

  const [required, setRequired] = useState(false);
  const [indexType, setIndexType] = useState(0);

  const changeQuestionType = (newIndex) => {
    setIndexType(newIndex);
  };

  const modifyQuestionTxt = (event) => {
    props.updateQuestion(event.target.value);
  };

  const toggleRequire = (event) => {
    setRequired(current => !current)
  };

  const renderType = () => {
    switch (questionTypes[indexType].type) {
      case "short":
        return <p className="short-answer">Short-answer text</p>
      case "paragraph":
        return <p className="paragraph">Long-answer text</p>
      case "radio":
        return <RadioAnswer isActive={props.isActive} />
      case "checkbox":
        return <Checkbox isActive={props.isActive} />
        default:
        console.log("Default");
    }
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
        <QuestionsList
          questionTypes={questionTypes}
          changeQuestionType={changeQuestionType}
          selectedIndex={indexType}
        />
      </div>
      {renderType()}
      <div className="question-icons">
        <i
          className={`fa-solid fa-trash-can ${props.isActive ? '' : 'hidden'}`}
          onClick={() => props.deleteQuestion()}
        >
        </i>
        <div
          className={`required-button ${props.isActive ? '' : 'hidden'}`}
          onClick={() => toggleRequire()}
        >
          <i className={`fa-solid fa-circle ${required ? 'require-active' : ''}`}></i>
        </div>
      </div>
    </div>
  )
}
