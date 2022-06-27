import { v4 as uuidv4 } from "uuid";
const questionTypes = [
  {
    label: "Short answer",
    className: "fa-solid fa-grip-lines icon",
    type: "short",
    id: uuidv4()
  },
  {
    label: "Paragraph",
    className: "fa-solid fa-align-justify icon",
    type: "paragraph",
    id: uuidv4()
  },
  {
    label: "Single choice",
    className: "fa-solid fa-check icon",
    type: "radio",
    id: uuidv4(),
    content: { options: [{ label: "Option", id: uuidv4() }] }
  },
  {
    label: "Multiple choice",
    className: "fa-solid fa-list-check icon",
    type: "checkbox",
    id: uuidv4(),
    content: { options: [{ label: "Option", id: uuidv4() }] }
  },
  {
    label: "Linear scale",
    className: "fa-solid fa-ruler-horizontal icon",
    type: "number",
    id: uuidv4(),
    content: { min: 0, max: 4, minLabel: "", maxLabel: "" }
  }
];

export default questionTypes;
