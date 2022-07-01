import React, { useEffect, useRef, useState } from 'react';
import AnswerForm from './AnswerForm';

export default function Answers(props) {

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('Form description');
  const [questions, setQuestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);

  const didMountRef = useRef(false);

  useEffect(() => {
    let dataString = window.localStorage.getItem('MY_FORM_STATE');
    let data = JSON.parse(dataString)
    if (data !== null) {
      setTitle(data.title);
      setDescription(data.description);
      setQuestions(data.questions);
      setAnswers(data.questions.map(question => {
        let value;
        let label;

        switch (question.type) {
          case 'short':
          case 'paragraph':
            value = '';
            break;
          case 'radio':
            value =  '';
            label = '';
            break;
          case 'number':
            value = -1
            break;
          case 'checkbox':
            value = [];
            label = [];
            break;
          default:
            break;
        }
        return {
          value,
          label
        };
      }));
      setSelectedIndex(data.selectedIndex);
    }
    dataString = window.localStorage.getItem('MY_ANSWER_FORM_STATE');
    data = JSON.parse(dataString);
    if (data !== null) {
      setAnswers(data.answers);
    }
    didMountRef.current = true;
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      return;
    }

    const answerState = {
      answers
    };
    window.localStorage.setItem('MY_ANSWER_FORM_STATE', JSON.stringify(answerState));
  }, [answers]);

  const updateAnswer = function (index, newAnswer) {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = newAnswer;
      return newAnswers;
    });
  };

  return (
    <div className="form-container">
      <div>
        <div className="form-title-container">
          <div className="form-title-container-line"></div>
            <h1>{title}</h1>
            <span>{description}</span>
        </div>
          {answers.map((answer, i) => (
            <AnswerForm
              updateAnswer={(answer) => updateAnswer(i, answer)}
              answer={answer}
              question={questions[i]}
              key={questions[i].title}
            />
          ))}
      </div>
    </div>
  )
}
