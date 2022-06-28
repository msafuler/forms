import React, { useEffect, useRef, useState } from 'react';
import AnswerForm from './AnswerForm';

export default function Answers(props) {

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('Form description');
  const [questions, setQuestions] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const didMountRef = useRef(false);

  useEffect(() => {
    const dataString = window.localStorage.getItem('MY_FORM_STATE');
    const data = JSON.parse(dataString)
    if (data !== null) {
      setTitle(data.title);
      setDescription(data.description);
      setQuestions(data.questions);
      setFormActive(data.formActive);
      setSelectedIndex(data.selectedIndex);
    }
    didMountRef.current = true;
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      return;
    }

    const formState = {
      title,
      description,
      questions,
      formActive,
      selectedIndex
    };
  }, [title, description, questions, formActive, selectedIndex]);

  return (
    <div className="form-container">
      <div>
        <div className="form-title-container">
          <div className="form-title-container-line"></div>
            <h1>{title}</h1>
            <span>{description}</span>
        </div>

          {questions.map((question, i) => (
            <AnswerForm
              question={question}
              key={question.title}
            />
          ))}
      </div>
    </div>
  )
}
