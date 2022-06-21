import React, { useState, useEffect, useRef } from 'react';
import TextArea from './TextArea';
import Question from './Question';

export default function Form(props) {

  const ref = useRef(null);

  const newTitle = (event) => {
    setTitle(event.target.value);
  };

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('Form description');
  const [questions, setQuestions] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [index, setIndex] = useState(-1);

  const newQuestion = (_) => {
    setQuestions((prev) => [...prev, {}]);
  };

  const updateQuestion = function (index, txt) {
    const chosenQuestion = questions[index];
    setQuestions(prevQuestions => {
      console.log(...prevQuestions.slice(0, index))
      return [
        ...prevQuestions.slice(0, index),
        prevQuestions[index] + 1,
        ...prevQuestions.slice(index + 1),
      ]
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {

      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  //const divStyles = { backgroundColor: 'rgba(21, 164, 195, 100' };

  return (
    <div className="form-container">
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
          <Question
            toggleActive={() => toggleActive(i)}
            updateQuestion={() => updateQuestion(i)}
            isActive={index === i}
          />
        )
      })}
      <button
        onClick={newQuestion}
        className="btn-add-question"
      >
        <i className="fa-solid fa-circle-plus">
        </i>
      </button>
    </div>
  )
}
