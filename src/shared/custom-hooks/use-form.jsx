import React, { useReducer, useState, useEffect } from 'react';

// const initialInputsStates = {
//   titleIsValid: false,
//   imageIsValid: false,
//   ageIsValid: false,
//   revenueIsValid: false,
//   profitIsValid: false,
//   priceIsValid: false,
//   descriptionIsValid: false,
// };

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

const useForm = (...initialInputs) => {
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
      ? dispatch({ type: 'VALIDATE_INPUT', payload: `${fieldName}isValid` })
      : dispatch({ type: 'INVALIDATE_INPUT', payload: `${fieldName}isValid` });

  useEffect(() => {
    setFormIsValid(() =>
      Object.values(inputsStates).every((isValid) => isValid)
    );
  }, [inputsStates]);

  return [formIsValid, inputValidationChangeHandler];

  // const [formState, dispatch] = useReducer(reducer, initialInputsStates);
};

export default useForm;
