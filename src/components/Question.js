import React, { useState } from 'react';
import QuestionsList from './QuestionsList'

export default function Question(props) {

  const [required, setRequired] = useState(false);
  const [indexType, setIndexType] = useState(0);

  const changeQuestionType = (newIndex) => {
    setIndexType(newIndex);
  };

  const questionTypes = [
    {
      label: "Short answer",
      className: "fa-solid fa-grip-lines icon",
      type: "short"
    },
    {
      label: "Paragraph",
      className: "fa-solid fa-align-justify icon",
      type: "paragraph"
    },
    {
      label: "Single choice",
      className: "fa-solid fa-check icon",
      type: "radio"
    },
    {
      label: "Multiple choice",
      className: "fa-solid fa-list-check icon",
      type: "checkbox"
    },
    {
      label: "Linear scale",
      className: "fa-solid fa-ruler-horizontal icon",
      type: "number"
    }
  ];

  const modifyQuestionTxt = (event) => {
    props.updateQuestion(event.target.value);
  };

  const toggleRequire = (event) => {
    setRequired(current => !current)
  };

  const renderType = () => {
    switch (questionTypes[indexType].type) {
      case "short":
        return <p>Short-answer text</p>
      case "paragraph":
        return <p>Long-answer text</p>
      case "radio":
        return <p>Radio</p>
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
