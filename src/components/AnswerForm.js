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
            className={props.question.required && props.answer.value === '' ?  "error" : ""}
          />)
      case "paragraph":
        return (
          <TextArea
            fieldDescription={props.answer.value}
            setFieldDescription={saveText}
            placeholder="Long-answer text"
            className={props.question.required && props.answer.value === '' ? "error" : ""}
          />
        )
      case "radio":
        return (
        <RadioAnswer
          question={props.question}
          updateAnswer={props.updateAnswer}
          answer={props.answer}
          className={props.question.required && props.answer.value === '' ? "error" : ""}
        />
        )
      case "checkbox":
        return (
          <CheckboxAnswer
            question={props.question}
            updateAnswer={props.updateAnswer}
            answer={props.answer}
            className={props.question.required && props.answer.value.length === 0 ? "error" : ""}
          />)
      case "number":
        return (
        <LinearScaleAnswer
          question={props.question}
          updateAnswer={props.updateAnswer}
          answer={props.answer}
          className={props.question.required && props.answer.value === -1 ? "error" : ""}
        />)
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
