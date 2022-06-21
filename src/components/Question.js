import React, { useState } from 'react';

export default function Question(props) {

  const modifyQuestionTxt = (event) => {
    props.updateQuestion(event.target.value);
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
      <i className={`fa-solid fa-trash-can ${props.isActive ? 'hiden' : ''}`}></i>
    </div>
  )
}
