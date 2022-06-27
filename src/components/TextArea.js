import React, { useEffect, useRef } from 'react';

export default function TextArea(props) {

  const ref = useRef(null);

  useEffect(() => {
    const textarea = ref.current;
    const heightLimit = 200;
    const resizeTextArea = (_) => {
      textarea.style.height = "";
      textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
    }
    textarea.addEventListener("input", resizeTextArea);
    return () => {
      textarea.removeEventListener("input", resizeTextArea);
    }
  }, []);

  const changeDescription = (event) => {
    props.setDescription(event.target.value);
  };


  return (
    <textarea
      style={{resize: 'none'}}
      className="form-description"
      placeholder="Form description"
      value={props.description}
      type="text"
      onChange={changeDescription}
      ref={ref}
    >
    </textarea>
  )
}
