import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useClickOutside } from "../hooks/useClickOutside";
import range from "../helpers/range";

export default function LinearScale(props) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useClickOutside(dropdownRef, false);

  const toggleScale = () => {
    setOpen(!open);
  };

  const changeNum = (newNum) => {
    props.setNum(newNum);
  };

  const clickNum = (event) => changeNum(parseInt(event.target.innerText, 10));

  const numbers = range(props.minNumber, props.maxNumber).map((n) => {
    return (
      <li
        className={`linear-scale-number ${
          props.num === n ? "selectedType" : ""
        }`}
        onClick={clickNum}
        key={uuidv4()}
      >
        {n}
      </li>
    );
  });

  return (
    <div className="linear-scale-column">
      <ul className={`linear-scale ${open ? "" : "hidden"}`}>{numbers}</ul>
      <div
        onClick={toggleScale}
        ref={dropdownRef}
        className="linear-scale-toggle"
      >
        <p className="linear-scale-num">{props.num}</p>
        <i className="fa-solid fa-sort-down scale-arrow"></i>
      </div>
    </div>
  );
}
