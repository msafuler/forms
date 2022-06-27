import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export const useOptions = (initialState) => {

  const [options, setOptions] = useState(initialState);

  const changeOption = (optionValue, i) => {
    setOptions(previousOptions => {
      const modifiedOptions = [...previousOptions]
      modifiedOptions[i] = { ...optionValue, id: modifiedOptions[i].id };

      return modifiedOptions;
    });
  };

  const addOption = (newOption) => {
    setOptions(previousOptions => {
      const modifiedOptions = [...previousOptions]
      modifiedOptions.push({...newOption, id: uuidv4()});
      return modifiedOptions;
    })
  };

  const deleteOption = (currentIndex) => {
    setOptions(prevOptions => {
      const currentOptions = [...prevOptions]
      currentOptions.splice(currentIndex, 1)
      return currentOptions
    });
  };

  return [options, setOptions, { changeOption, addOption, deleteOption }]
}
