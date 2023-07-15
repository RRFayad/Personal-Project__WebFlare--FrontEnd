/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { useReducer, useState, useEffect } from 'react';

import formValidationReducer from './formValidationReducer';

const formValidationReducerv2 = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      // console.log(action);
      // console.log({ [action.payload]: { ...action.payload } });
      return { ...state, ...action.payload };

    case 'VALIDATE_INPUT':
      // payload: {input}
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isValid: true,
        },
      };
    case 'INVALIDATE_INPUT':
      // payload: {input}
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isValid: false,
        },
      };
    case 'SET_FORM_DATA':
      return action.payload;
    default:
      return state;
  }
};

const useFormValidation = () => {
  const [formData, dispatch] = useReducer(formValidationReducerv2, {});
  const [formIsValid, setFormIsValid] = useState(false);

  const setFormInputs = (inputs) => {
    // console.log(inputs);
    let newState = {};
    for (const input of inputs) {
      // console.log(input);
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
    console.log(formData);
    setFormIsValid(() =>
      Object.values(formData).every((inputState) => inputState.isValid)
    );
  }, [formData]);

  return [formIsValid, inputChangeHandler, setFormInputs, formData];
};

export default useFormValidation;
