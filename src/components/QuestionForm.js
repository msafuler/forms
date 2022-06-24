import React, { useState } from 'react';
import questionTypes from '../data/questionTypes'
import QuestionsList from './QuestionsList';
import RadioAnswer from './RadioAnswer';
import Checkbox from './Checkbox';
import LinearScale from './LinearScale';

export default function QuestionForm(props) {

  const [indexType, setIndexType] = useState(0);

  const changeQuestionType = (newIndex) => {
    setIndexType(newIndex);
  };

  const modifyQuestionTitle = (event) => {
    props.updateQuestion({
      ...props.question,
      title: event.target.value
    });
  };

  const modifyQuestionRequired = () => {
    props.updateQuestion({
      ...props.question,
      required: !props.question.required
    });
  }

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
      case "number":
        return <LinearScale selectedIndex={indexType} />
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
          onChange={modifyQuestionTitle}
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
          onClick={() => modifyQuestionRequired()}
        >
          <i className={`fa-solid fa-circle ${props.question.required ? 'require-active' : ''}`}></i>
        </div>
      </div>
    </div>
  )
}
