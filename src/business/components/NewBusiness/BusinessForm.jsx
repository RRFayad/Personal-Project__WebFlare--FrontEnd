import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import NewAuthContext from '../../../shared/context/NewAuthContext';
import BusinessContext from '../../../shared/context/BusinessContext';
import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';
import useForm from '../../../shared/custom-hooks/useForm';

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
  } = useContext(BusinessContext);
  const { userData } = useContext(NewAuthContext);
  const history = useHistory();

  const { bid: businessToBeEdittedId } = useParams();
  const businessToBeEditted = allBusinesses.find(
    (business) => business.id === businessToBeEdittedId
  );

  const [formIsValid, inputChangeHandler, setFormInputs, formData] = useForm();

  useEffect(() => {
    setFormInputs([
      'title',
      'imageUrl',
      'type',
      'niche',
      'age',
      'monthlyRevenue',
      'monthlyProfit',
      'askingPrice',
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
          onInputChange={inputChangeHandler}
          errorMessage="Title must have at least 3 Characters"
          defaultValue={businessToBeEdittedId && businessToBeEditted.title}
        />
        <FormInput
          labelValue="Image URL"
          HTMLElement="input"
          name="imageUrl"
          type="text"
          validation={urlValidator}
          onInputChange={inputChangeHandler}
          errorMessage="Please enter a valid URL"
          defaultValue={businessToBeEdittedId && businessToBeEditted.imageUrl}
        />
        <FormInput
          labelValue="Type Of Business"
          HTMLElement="select"
          name="type"
          options={businessTypesOptions}
          validation={null}
          onInputChange={inputChangeHandler}
          errorMessage="Please select the type of your business"
          defaultValue={businessToBeEdittedId && businessToBeEditted.type}
        />
        <FormInput
          labelValue="Niche"
          HTMLElement="select"
          name="niche"
          options={nichesOptions}
          validation={null}
          onInputChange={inputChangeHandler}
          errorMessage="Please select your business' niche"
          defaultValue={businessToBeEdittedId && businessToBeEditted.niche}
        />
        <FormInput
          labelValue="Age of the Business (in years)"
          HTMLElement="input"
          name="age"
          type="number"
          validation={integerInputValidator}
          onInputChange={inputChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={businessToBeEdittedId && businessToBeEditted.age}
        />
        <FormInput
          labelValue="Monthly Revenue"
          HTMLElement="input"
          name="monthlyRevenue"
          type="number"
          validation={(value) => integerInputValidator(value)}
          onInputChange={inputChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.monthlyRevenue
          }
        />
        <FormInput
          labelValue="Monthly Profit"
          HTMLElement="input"
          name="monthlyProfit"
          type="number"
          validation={(value) => integerInputValidator(value)}
          onInputChange={inputChangeHandler}
          errorMessage="Please insert a integer and positive number"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.monthlyProfit
          }
        />
        <FormInput
          labelValue="Asking Price"
          HTMLElement="input"
          name="askingPrice"
          type="number"
          validation={(value) => integerInputValidator(value)}
          onInputChange={inputChangeHandler}
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
          onInputChange={inputChangeHandler}
          errorMessage="Description must contain at least 6 characters"
          defaultValue={
            businessToBeEdittedId && businessToBeEditted.description
          }
        />
      </div>
      <div className={classes.form__buttons}>
        {!businessToBeEdittedId && (
          <FormButton
            disabled={!formIsValid}
            onClick={async () => {
              await addNewBusiness(formData, userData.id);
              history.push('/');
            }}
          >
            Create
          </FormButton>
        )}
        {businessToBeEdittedId && (
          <FormButton
            disabled={!formIsValid}
            onClick={async () => {
              await updateBusiness(formData, businessToBeEdittedId);
              history.push('/');
            }}
          >
            Update
          </FormButton>
        )}
        <FormButton
          caution
          onClick={() => history.push(`/users/${userData.id}/profile`)}
        >
          Cancel
        </FormButton>
      </div>
    </Form>
  );
}

export default BusinessForm;
