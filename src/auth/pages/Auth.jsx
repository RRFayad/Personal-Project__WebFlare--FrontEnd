import React from 'react';

import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';
import Form from '../../shared/ui-ux/Form';
import FormInput from '../../shared/ui-ux/FormInput';
import FormButton from '../../shared/ui-ux/FormButton';
import useFormValidation from '../../shared/custom-hooks/useFormValidation';
import {
  minLengthValidator,
  fullNameValidator,
  urlValidator,
  emailValidator,
  passwordValidator,
} from '../../shared/util/validators-and-formatters';

import classes from './Auth.module.css';

function Auth() {
  const [formIsValid, inputValidationChangeHandler] = useFormValidation(
    'name',
    'country',
    'linkedinUrl',
    'e-mail',
    'password',
    'description'
  );
  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <Form>
          <div className={classes.form__inputs}>
            <FormInput
              labelValue="Full Name"
              HTMLElement="input"
              type="text"
              name="name"
              validation={fullNameValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Please insert your Full Name"
            />
            <FormInput
              labelValue="Image URL"
              HTMLElement="input"
              type="url"
              name="name"
              validation={urlValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Please a valid url"
            />
            <FormInput
              labelValue="Linkedin Account"
              HTMLElement="input"
              type="url"
              name="linkedin"
              validation={urlValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Please insert your linkedin account URL"
            />
            <FormInput
              labelValue="Country"
              HTMLElement="input"
              type="text"
              name="country"
              validation={minLengthValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Please insert a valid country"
            />
            <FormInput
              labelValue="E-mail"
              HTMLElement="input"
              type="email"
              name="email"
              validation={emailValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Please insert a valid e-mail"
            />
            <FormInput
              labelValue="Password"
              HTMLElement="input"
              type="password"
              name="password"
              validation={passwordValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Password must contain at least: 6 to 20 characters, Uppercase, Lowercase, Number and a Special Character "
            />
            <FormInput
              labelValue="Your personal and professional description"
              HTMLElement="textarea"
              type="text"
              name="description"
              validation={minLengthValidator(6)}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Description must contain at least 6 characters"
            />
          </div>
          <div className={classes.form__buttons}>
            <FormButton>Login</FormButton>
          </div>
        </Form>
      </main>
      <Footer />
    </>
  );
}

export default Auth;
