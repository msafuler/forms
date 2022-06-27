import React, { useState } from 'react';
import questionTypes from '../data/questionTypes'
import QuestionsList from './QuestionsListDropdown';
import RadioQuestion from './RadioQuestion';
import Checkbox from './Checkbox';
import LinearScale from './LinearScale';

export default function QuestionForm(props) {

  const questionTypeIndex = questionTypes.findIndex(element => element.type === props.question.type)

  const [indexType, setIndexType] = useState(questionTypeIndex);

  const modifyQuestionType = (newIndex) => {
    setIndexType(newIndex);
    const questionType = questionTypes[newIndex]
    const questionTypeCopy = {...questionType}
    props.updateQuestion({ ...props.question, content: questionTypeCopy.content, type: questionTypeCopy.type });
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

  const modifyQuestionContent = (newContent) => {
    props.updateQuestion({
      ...props.question,
      content: { ...newContent }
    });
  };

  const renderType = () => {
    switch (questionTypes[indexType].type) {
      case "short":
        return <p className="short-answer">Short-answer text</p>
      case "paragraph":
        return <p className="paragraph">Long-answer text</p>
      case "radio":
        return <RadioQuestion question={props.question} isActive={props.isActive} modifyQuestionContent={modifyQuestionContent} />
      case "checkbox":
        return <Checkbox question={props.question}  isActive={props.isActive} modifyQuestionContent={modifyQuestionContent} />
      case "number":
        return <LinearScale question={props.question} selectedIndex={indexType} isActive={props.isActive} modifyQuestionContent={modifyQuestionContent} />
      default:
        console.log("Default");
    }
  };

  return (
    <div
      className={`question-form-container ${props.isActive ? 'inFocus' : 'outOfFocus'}`}
      onClick={() => props.toggleActive()}
    >
      <i className={`fa-solid fa-braille handle form ${props.isActive ? '' : 'hidden'}`}></i>
      <div className="first-line">
        <input
          className={`question-form ${props.isActive ? 'selected' : ''}`}
          placeholder="Question"
          type="text"
          onChange={modifyQuestionTitle}
          maxLength="100"
          value={props.question.title}
        />
        <QuestionsList
          questionTypes={questionTypes}
          changeQuestionType={modifyQuestionType}
          selectedIndex={indexType}
          isActive={props.isActive}
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
