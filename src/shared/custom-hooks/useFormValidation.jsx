import React, { useReducer, useState, useEffect } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'VALIDATE_INPUT':
      return {
        ...state,
        [action.payload]: true,
      };
    case 'INVALIDATE_INPUT':
      return {
        ...state,

        [action.payload]: false,
      };
    default:
      return state;
  }
};

const useFormValidation = (...initialInputs) => {
  const initialInputsStates = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const input of initialInputs) {
    const inputKey = `${input}IsValid`;
    initialInputsStates[inputKey] = false;
  }

  const [inputsStates, dispatch] = useReducer(reducer, initialInputsStates);
  const [formIsValid, setFormIsValid] = useState(false);

  const inputValidationChangeHandler = (inputIsValid, fieldName) =>
    inputIsValid
      ? dispatch({ type: 'VALIDATE_INPUT', payload: `${fieldName}IsValid` })
      : dispatch({ type: 'INVALIDATE_INPUT', payload: `${fieldName}IsValid` });

  useEffect(() => {
    setFormIsValid(() =>
      Object.values(inputsStates).every((isValid) => isValid)
    );
  }, [inputsStates]);

  return [formIsValid, inputValidationChangeHandler];

  // const [formState, dispatch] = useReducer(reducer, initialInputsStates);
};

export default useFormValidation;
