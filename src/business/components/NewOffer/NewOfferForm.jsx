import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';
import useFormValidation from '../../../shared/custom-hooks/useFormValidation';

import {
  minLengthValidator,
  integerInputValidator,
} from '../../../shared/util/validators-and-formatters';

import classes from './NewOfferForm.module.css';

function NewOfferForm() {
  const history = useHistory();

  const [formIsValid, inputValidationChangeHandler, setFormData] =
    useFormValidation();

  useEffect(() => {
    setFormData(['value', 'description']);
  }, []);

  return (
    <Form>
      <div className={classes.form__inputs}>
        <FormInput
          labelValue="Offer Value"
          HTMLElement="input"
          type="number"
          name="value"
          validation={integerInputValidator}
          onValidationChange={inputValidationChangeHandler}
          errorMessage="Please insert a integer and positive number"
          placeholder="XXX.XX"
        />

        <FormInput
          labelValue="Introduce yourself and describe your offer"
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
          onClick={() => {
            // eslint-disable-next-line
            console.log('Offer Sent!!');
            history.push(`/success`);
          }}
        >
          Send Offer
        </FormButton>
      </div>
    </Form>
  );
}

export default NewOfferForm;
