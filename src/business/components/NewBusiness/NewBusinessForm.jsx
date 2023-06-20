import React, { useState, useContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import DataContext from '../../../shared/context/DataContext';
import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';
import useFormValidation from '../../../shared/custom-hooks/useFormValidation';

import {
  minLengthValidator,
  integerInputValidator,
  urlValidator,
} from '../../../shared/util/validators-and-formatters';

import classes from './NewBusinessForm.module.css';

function NewBusinessForm() {
  const { businessTypesOptions, nichesOptions } = useContext(DataContext);
  const history = useHistory();

  const [formIsValid, inputValidationChangeHandler, setFormData] =
    useFormValidation();

  useEffect(() => {
    setFormData([
      'title',
      'image',
      'age',
      'revenue',
      'profit',
      'price',
      'description',
    ]);
  }, []);

  return (
    <Form>
      <div className={classes.form__inputs}>
        <FormInput
          labelValue="Title"
          HTMLElement="input"
          name="title"
          type="text"
          validation={minLengthValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Title must have at least 3 Characters"
        />
        <FormInput
          labelValue="Image URL"
          HTMLElement="input"
          name="image"
          type="text"
          validation={urlValidator}
          onValidationChange={inputValidationChangeHandler}
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
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Monthly Revenue"
          HTMLElement="input"
          type="number"
          name="revenue"
          validation={integerInputValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Monthly Profit"
          HTMLElement="input"
          type="number"
          name="profit"
          validation={integerInputValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Asking Price"
          HTMLElement="input"
          type="number"
          name="price"
          validation={integerInputValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
        />
        <FormInput
          labelValue="Description"
          HTMLElement="textarea"
          name="description"
          validation={(value) => minLengthValidator(value, 6)}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Description must contain at least 6 characters"
        />
      </div>
      <div className={classes.form__buttons}>
        <FormButton caution onClick={() => history.goBack()}>
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
