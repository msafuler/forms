import React, { useState, useRef } from 'react';
import TextArea from './TextArea';
import QuestionForm from './QuestionForm';

export default function Form(props) {

  const ref = useRef(null);
  const moveRef = useRef(null);

  const newTitle = (event) => {
    setTitle(event.target.value);
  };

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('Form description');
  const [questions, setQuestions] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [index, setIndex] = useState(-1);

  const newQuestion = (_) => {
    setQuestions((prev) => [...prev, {
      title: "",
      type: "short",
      required: false,
      content: {}
    }]);
  };

  const updateQuestion = function (index, newQuestion) {
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions]
      newQuestions[index] = newQuestion
      return newQuestions;
    });
  };

  const handleClick = () => {
    setFormActive(true)
    setIndex(-1)
  };

  const toggleActive = (newIndex) => {
    setIndex(newIndex)
    setFormActive(false)
  };

  const deleteQuestion = (currentIndex) => {
    setQuestions(prevQuestions => {
      const currentQuestions = [...prevQuestions]
      currentQuestions.splice(currentIndex, 1)
      return currentQuestions
    });
  };

  return (
    <div className="form-container">
      <div>
        <div
          className={`form-title-container ${ formActive ? 'inFocus' : 'outOfFocus' }`}
          ref={ref}
          onClick={handleClick}
        >
          <div className="form-title-container-line"></div>
          <input
            className="form-title"
            placeholder="Untitled form"
            type="text"
            onChange={newTitle}
            maxLength="32"
          />
          <TextArea />
        </div>
        {questions.map((question, i) => {
          return (
            <QuestionForm
              moveRef={moveRef}
              toggleActive={() => toggleActive(i)}
              updateQuestion={(newQuestion) => updateQuestion(i, newQuestion)}
              isActive={index === i}
              deleteQuestion={() => deleteQuestion(i)}
              question={question}
            />
          )
        })}
      </div>
      <div className="button-container">
        <button
          onClick={newQuestion}
          className="btn-add-question"
        >
          <i className="fa-solid fa-circle-plus">
          </i>
        </button>
      </div>

    </div>
  )
}
