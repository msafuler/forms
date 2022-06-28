import React, { useState } from 'react';
import questionTypes from '../data/questionTypes'
import QuestionsList from './QuestionsListDropdown';
import RadioAnswer from './RadioAnswer';
import CheckboxAnswer from './CheckboxAnswer';
import LinearScaleAnswer from './LinearScaleAnswer';

export default function AnswerForm(props) {

  const questionTypeIndex = questionTypes.findIndex(element => element.type === props.question.type)

  const [indexType, setIndexType] = useState(questionTypeIndex);

  const renderType = () => {
    switch (questionTypes[indexType].type) {
      case "short":
        return <input type="text" className="short-answer" placeholder="Short-answer text" />
      case "paragraph":
        return <input type="text" className="short-answer" placeholder="Long-answer text" />
      case "radio":
        return <RadioAnswer question={props.question} />
      case "checkbox":
        return <CheckboxAnswer question={props.question}  />
      case "number":
        return <LinearScaleAnswer question={props.question} />
      default:
        return null;
    }
  };

  return (
    <div
      className="question-form-container"
    >
      <div className="first-line">
        <span className="question-form">{props.question.title}</span>
      </div>
      {renderType()}
      <div className="question-icons">
        <span className={`${props.question.required ? "show-required" : "hidden"}`}>*Required</span>
      </div>
    </div>
  )
}
