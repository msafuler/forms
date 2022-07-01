import React, { useState } from 'react';
import questionTypes from '../data/questionTypes';
import RadioAnswer from './RadioAnswer';
import CheckboxAnswer from './CheckboxAnswer';
import LinearScaleAnswer from './LinearScaleAnswer';
import TextArea from './TextArea';

export default function AnswerForm(props) {

  const questionTypeIndex = questionTypes.findIndex(element => element.type === props.question.type)

  const [indexType, setIndexType] = useState(questionTypeIndex);

  const saveText = (value) => props.updateAnswer({ value });

  const renderType = () => {
    switch (questionTypes[indexType].type) {
      case "short":
        return (
          <TextArea
            fieldDescription={props.answer.value}
            setFieldDescription={saveText}
            placeholder="Short-answer text"
            maxLength="120"
          />)
      case "paragraph":
        return (
          <TextArea
            fieldDescription={props.answer.value}
            setFieldDescription={saveText}
            placeholder="Long-answer text"
          />
        )
      case "radio":
        return (
        <RadioAnswer
          question={props.question}
          updateAnswer={props.updateAnswer}
          answer={props.answer}
        />
        )
      case "checkbox":
        return (
          <CheckboxAnswer
            question={props.question}
            updateAnswer={props.updateAnswer}
            answer={props.answer}
          />)
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
