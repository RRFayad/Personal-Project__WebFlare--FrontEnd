import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';

import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';
import useForm from '../../../shared/custom-hooks/useForm';
import OffersContext from '../../../shared/context/OffersContext';
import NewAuthContext from '../../../shared/context/AuthContext';

import {
  minLengthValidator,
  integerInputValidator,
} from '../../../shared/util/validators-and-formatters';

import classes from './NewOfferForm.module.css';

function NewOfferForm() {
  const history = useHistory();
  const { bid: businessId } = useParams();
  const { userData } = useContext(NewAuthContext);
  const { sendOffer } = useContext(OffersContext);

  const [formIsValid, inputChangeHandler, setFormInputs, formData] = useForm();

  useEffect(() => {
    setFormInputs(['offerValue', 'message']);
  }, []);

  return (
    <Form>
      <div className={classes.form__inputs}>
        <FormInput
          labelValue="Offer Value"
          HTMLElement="input"
          type="number"
          name="offerValue"
          validation={integerInputValidator}
          onInputChange={inputChangeHandler}
          errorMessage="Please insert a integer and positive number"
          placeholder="XXX.XX"
        />

        <FormInput
          labelValue="Introduce yourself and describe your offer"
          HTMLElement="textarea"
          name="message"
          validation={(value) => minLengthValidator(value, 6)}
          onInputChange={inputChangeHandler}
          errorMessage="Description must contain at least 6 characters"
        />
      </div>
      <div className={classes.form__buttons}>
        <FormButton caution onClick={() => history.push('/')}>
          Cancel
        </FormButton>
        <FormButton
          disabled={!formIsValid}
          onClick={async () => {
            // eslint-disable-next-line
            await sendOffer(formData, userData.id, businessId);
            history.push(`/success/offer-sent`);
          }}
        >
          Send Offer
        </FormButton>
      </div>
    </Form>
  );
}

export default NewOfferForm;
