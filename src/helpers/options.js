import { useState } from 'react';

export const useOptions = (initialState) => {

  const [options, setOptions] = useState(initialState);

  const changeOption = (optionValue, i) => {
    setOptions(previousOptions => {
      const modifiedOptions = [...previousOptions]
      modifiedOptions[i] = optionValue;
      return modifiedOptions;
    });
  };

  const addOption = (newOption) => {
    setOptions(previousOptions => {
      const modifiedOptions = [...previousOptions]
      modifiedOptions.push(newOption);
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
