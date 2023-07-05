import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DataContext from '../../../shared/context/BusinessContext';
import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';
import useFormValidation from '../../../shared/custom-hooks/useFormValidation';

import {
  minLengthValidator,
  integerInputValidator,
  urlValidator,
} from '../../../shared/util/validators-and-formatters';

import classes from './BusinessForm.module.css';

function BusinessForm() {
  const {
    businessTypesOptions,
    nichesOptions,
    allBusinesses,
    addNewBusiness,
    updateBusiness,
  } = useContext(DataContext);
  const history = useHistory();

  const { uid: userId, bid: businessToBeEdittedId } = useParams();
  const businessToBeEditted = allBusinesses.find(
    (business) => business.id === businessToBeEdittedId
  );

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
          defaultValue={businessToBeEdittedId && businessToBeEditted.title}
        />
        <FormInput
          labelValue="Image URL"
          HTMLElement="input"
          name="image"
          type="text"
          validation={urlValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please enter a valid URL"
          defaultValue={businessToBeEdittedId && businessToBeEditted.imageUrl}
        />
        <FormInput
          labelValue="Type Of Business"
          HTMLElement="select"
          name="type"
          options={businessTypesOptions}
          defaultValue={businessToBeEdittedId && businessToBeEditted.type}
        />
        <FormInput
          labelValue="Niche"
          HTMLElement="select"
          name="niche"
          options={nichesOptions}
          defaultValue={businessToBeEdittedId && businessToBeEditted.niche}
        />
        <FormInput
          labelValue="Age of the Business (in years)"
          HTMLElement="input"
          type="number"
          name="age"
          validation={integerInputValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={businessToBeEdittedId && businessToBeEditted.age}
        />
        <FormInput
          labelValue="Monthly Revenue"
          HTMLElement="input"
          type="number"
          name="revenue"
          validation={(value) => integerInputValidator(value)}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.monthlyRevenue
          }
        />
        <FormInput
          labelValue="Monthly Profit"
          HTMLElement="input"
          type="number"
          name="profit"
          validation={(value) => integerInputValidator(value)}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.monthlyProfit
          }
        />
        <FormInput
          labelValue="Asking Price"
          HTMLElement="input"
          type="number"
          name="price"
          validation={(value) => integerInputValidator(value)}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.askingPrice
          }
        />
        <FormInput
          labelValue="Description"
          HTMLElement="textarea"
          name="description"
          validation={(value) => minLengthValidator(value, 6)}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Description must contain at least 6 characters"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.description
          }
        />
      </div>
      <div className={classes.form__buttons}>
        {!businessToBeEdittedId && (
          <FormButton disabled={!formIsValid} onClick={addNewBusiness}>
            Create
          </FormButton>
        )}
        {businessToBeEdittedId && (
          <FormButton disabled={!formIsValid} onClick={updateBusiness}>
            Update
          </FormButton>
        )}
        <FormButton caution onClick={() => history.goBack()}>
          Cancel
        </FormButton>
      </div>
    </Form>
  );
}

export default BusinessForm;
