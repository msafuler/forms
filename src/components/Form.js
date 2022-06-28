import React, { useState, useRef, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import TextArea from './TextArea';
import QuestionForm from './QuestionForm';

export default function Form(props) {

  const ref = useRef(null);
  const didMountRef = useRef(false);

  const newTitle = (event) => {
    setTitle(event.target.value);
  };

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('Form description');
  const [questions, setQuestions] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
    window.localStorage.setItem('MY_FORM_STATE', JSON.stringify(formState));
  }, [title, description, questions, formActive, selectedIndex]);

  const newQuestion = (event) => {
    setQuestions((prev) => [...prev, {
      title: "",
      type: "short",
      required: false,
      content: null,
      id: uuidv4()
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
    setSelectedIndex(-1)
  };

  const toggleActive = (newIndex) => {
    setSelectedIndex(newIndex)
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
            value={title}
            onChange={newTitle}
            maxLength="32"
          />
          <TextArea description={description} setDescription={setDescription}/>
        </div>
            <ReactSortable
              list={questions}
              setList={setQuestions}
              animation={200}
              delayOnTouchStart={true}
              delay={2}
              handle={'.handle'}
              onEnd={(event) => setSelectedIndex(event.newIndex)}
            >
              {questions.map((question, i) => (
              <QuestionForm
                toggleActive={() => toggleActive(i)}
                updateQuestion={(newQuestion) => updateQuestion(i, newQuestion)}
                isActive={selectedIndex === i}
                deleteQuestion={() => deleteQuestion(i)}
                question={question}
                key={question.id}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
              />))}
            </ReactSortable>
      </div>
      <div className="button-container">
        <button
          onClick={newQuestion}
          className="btn-add-question"
        >
          <i className="fa-solid fa-circle-plus" />
        </button>
      </div>

    </div>
  )
}
