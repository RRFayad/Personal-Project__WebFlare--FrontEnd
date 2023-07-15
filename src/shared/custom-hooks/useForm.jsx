/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { useReducer, useState, useEffect } from 'react';

const formDataReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return { ...state, ...action.payload };

    case 'SET_FORM_DATA':
      return action.payload;
    default:
      return state;
  }
};

const useForm = () => {
  const [formData, dispatch] = useReducer(formDataReducer, {});
  const [formIsValid, setFormIsValid] = useState(false);

  const setFormInputs = (inputs) => {
    let newState = {};
    for (const input of inputs) {
      const inputState = {
        isValid: false,
        value: null,
      };
      if (formData.hasOwnProperty(input)) {
        newState = {
          ...newState,
          [input]: { ...formData[input] },
        };
      }
      if (!formData.hasOwnProperty(input)) {
        newState = { ...newState, [input]: inputState };
      }
      // console.log(newState);
    }
    dispatch({ type: 'SET_FORM_DATA', payload: newState });
  };

  const inputChangeHandler = (inputName, inputIsValid, inputValue) => {
    dispatch({
      type: 'UPDATE_INPUT',
      payload: { [inputName]: { isValid: inputIsValid, value: inputValue } },
    });
  };

  useEffect(() => {
    // console.log(formData);
    setFormIsValid(() =>
      Object.values(formData).every((inputState) => inputState.isValid)
    );
  }, [formData]);

  return [formIsValid, inputChangeHandler, setFormInputs, formData];
};

export default useForm;
