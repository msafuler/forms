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
    resizeTextArea();
    textarea.addEventListener("input", resizeTextArea);
    return () => {
      textarea.removeEventListener("input", resizeTextArea);
    }
  }, []);

  const changeFieldDescription = (event) => {
    props.setFieldDescription(event.target.value);
  };


  return (
    <textarea
      style={{resize: 'none'}}
      className="form-description"
      placeholder={props.placeholder}
      value={props.fieldDescription}
      type="text"
      onChange={changeFieldDescription}
      ref={ref}
      maxLength={props.maxLength}
    >
    </textarea>
  )
}
