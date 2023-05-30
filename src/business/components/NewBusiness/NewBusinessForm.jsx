import React, { useState, useContext, useEffect, useReducer } from 'react';

import DataContext from '../../../shared/context/DummyDataContext';
import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';

import {
  minLengthValidator,
  integerInputValidator,
  urlValidator,
} from '../../../shared/util/validators';

import classes from './NewBusinessForm.module.css';

const initialInputsStates = {
  titleIsValid: false,
  imageIsValid: false,
  ageIsValid: false,
  revenueIsValid: false,
  profitIsValid: false,
  priceIsValid: false,
  descriptionIsValid: false,
};

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

function NewBusinessForm() {
  const [inputsStates, dispatch] = useReducer(reducer, initialInputsStates);
  const [formIsValid, setFormIsValid] = useState(false);

  const { businessTypesOptions, nichesOptions } = useContext(DataContext);

  const validateHandler = (inputIsValid, fieldName) =>
    inputIsValid
      ? dispatch({ type: 'VALIDATE_INPUT', payload: `${fieldName}IsValid` })
      : dispatch({ type: 'INVALIDATE_INPUT', payload: `${fieldName}IsValid` });

  useEffect(() => {
    setFormIsValid(() =>
      Object.values(inputsStates).every((isValid) => isValid)
    );
  }, [inputsStates]);

  return (
    <Form>
      <div className={classes.form__inputs}>
        <FormInput
          labelValue="Title"
          HTMLElement="input"
          name="title"
          type="text"
          validation={minLengthValidator}
          onValidationChange={validateHandler}
          errorMessage="Title must have at least 3 Characters"
        />
        <FormInput
          labelValue="Image URL"
          HTMLElement="input"
          name="image"
          type="text"
          validation={urlValidator}
          onValidationChange={validateHandler}
          errorMessage="Please enter a valid URL"
        />
        <FormInput
          labelValue="Type Of Business"
          HTMLElement="select"
          name="type"
          options={businessTypesOptions}
        />
        <FormInput
          labelValue="Niche"
          HTMLElement="select"
          name="niche"
          options={nichesOptions}
        />
        <FormInput
          labelValue="Age of the Business"
          HTMLElement="input"
          type="number"
          name="age"
          validation={integerInputValidator}
          onValidationChange={validateHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Monthly Revenue"
          HTMLElement="input"
          type="number"
          name="revenue"
          validation={integerInputValidator}
          onValidationChange={validateHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Monthly Profit"
          HTMLElement="input"
          type="number"
          name="profit"
          validation={integerInputValidator}
          onValidationChange={validateHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Asking Price"
          HTMLElement="input"
          type="number"
          name="price"
          validation={integerInputValidator}
          onValidationChange={validateHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Description"
          HTMLElement="textarea"
          name="description"
          validation={(value) => minLengthValidator(value, 6)}
          onValidationChange={validateHandler}
          errorMessage="Description must contain at least 6 characters"
        />
      </div>
      <div className={classes.form__buttons}>
        <FormButton caution onClick={() => console.log({ inputsStates })}>
          Cancel
        </FormButton>
        <FormButton
          disabled={!formIsValid}
          onClick={() => console.log('Create!!')}
        >
          Create
        </FormButton>
      </div>
    </Form>
  );
}

export default NewBusinessForm;
