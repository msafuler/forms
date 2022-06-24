import React, { useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

export default function LinearScale(props) {

  const dropdownRef = useRef(null);
  const [open, setOpen] = useClickOutside(dropdownRef, false);

  const toggleScale = () => {
    setOpen(!open);
  };

  const changeNum = (newNum) => {
    props.setNum(newNum);
  };

  const clickNum = (event => changeNum(parseInt(event.target.innerText, 10)))

  const arr = [];
  for (let n = props.minNumber; n <= props.maxNumber; n++) {
    arr.push(
      <li
        className={`linear-scale-number ${props.num === n ? 'selectedType' : ''}`}
        onClick={clickNum}
      >
        {n}
      </li>
    );
  }

  return (
      <div className="linear-scale-column">
        <ul className={`linear-scale ${open ? "" : "hidden"}`}>
          {arr}
        </ul>
        <div
          onClick={toggleScale}
          ref={dropdownRef}
          className="linear-scale-toggle"
        >
          <p className="linear-scale-num">
            {props.num}
          </p>
          <i className="fa-solid fa-sort-down scale-arrow"></i>
        </div>
      </div>
  );
};
