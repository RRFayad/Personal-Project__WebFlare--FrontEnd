import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../shared/context/AuthContext';
import NewAuthContext from '../../shared/context/NewAuthContext';
import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';
import Form from '../../shared/ui-ux/Form';
import FormInput from '../../shared/ui-ux/FormInput';
import FormButton from '../../shared/ui-ux/FormButton';
import useForm from '../../shared/custom-hooks/useForm';
import LoadingSpinner from '../../shared/ui-ux/LoadingSpinner';
import {
  minLengthValidator,
  fullNameValidator,
  urlValidator,
  emailValidator,
  passwordValidator,
} from '../../shared/util/validators-and-formatters';

import classes from './Auth.module.css';

function Auth() {
  const history = useHistory();
  // const { loginHandler } = useContext(AuthContext);
  const { signUpHandler, loginHandler } = useContext(NewAuthContext);

  const [userHasAccount, setUserHasAccount] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loginInputs = ['email', 'password'];
  const signUpInputs = [
    'name',
    'imageUrl',
    'country',
    'email',
    'password',
    'description',
  ];

  const toggleUserHasAccount = () => {
    setUserHasAccount((prevState) => !prevState);
  };

  const [formIsValid, inputChangeHandler, setFormInputs, formData] = useForm();

  useEffect(() => {
    userHasAccount ? setFormInputs(loginInputs) : setFormInputs(signUpInputs);
  }, [userHasAccount]);

  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <Form>
          {isLoading && <LoadingSpinner overlay />}
          <div className={classes.form__inputs}>
            {!userHasAccount && (
              <FormInput
                labelValue="Full Name"
                HTMLElement="input"
                name="name"
                type="text"
                validation={fullNameValidator}
                onInputChange={inputChangeHandler}
                errorMessage="Please insert your Full Name"
              />
            )}
            {!userHasAccount && (
              <FormInput
                labelValue="Image URL"
                HTMLElement="input"
                type="url"
                name="imageUrl"
                validation={urlValidator}
                onInputChange={inputChangeHandler}
                errorMessage="Please a valid url"
              />
            )}
            {!userHasAccount && (
              <FormInput
                labelValue="Linkedin Account"
                HTMLElement="input"
                type="url"
                name="linkedinUrl"
                validation={urlValidator}
                onInputChange={inputChangeHandler}
                errorMessage="Please insert your linkedin account URL"
              />
            )}
            {!userHasAccount && (
              <FormInput
                labelValue="Country"
                HTMLElement="input"
                type="text"
                name="country"
                validation={minLengthValidator}
                onInputChange={inputChangeHandler}
                errorMessage="Please insert a valid country"
              />
            )}
            <FormInput
              labelValue="E-mail"
              HTMLElement="input"
              type="email"
              name="email"
              validation={emailValidator}
              onInputChange={inputChangeHandler}
              errorMessage="Please insert a valid e-mail"
            />
            <FormInput
              labelValue="Password"
              HTMLElement="input"
              type="password"
              name="password"
              validation={passwordValidator}
              onInputChange={inputChangeHandler}
              errorMessage="Password must contain at least: 6 to 20 characters, Uppercase, Lowercase, Number and a Special Character "
            />
            {!userHasAccount && (
              <FormInput
                labelValue="Your personal and professional description"
                HTMLElement="textarea"
                type="text"
                name="description"
                validation={(value) => minLengthValidator(value, 6)}
                onInputChange={inputChangeHandler}
                errorMessage="Description must contain at least 6 characters"
              />
            )}
          </div>
          <div className={classes.form__buttons}>
            <FormButton
              disabled={!formIsValid}
              onClick={async () => {
                setIsLoading(true);
                if (!userHasAccount) {
                  await signUpHandler(formData);
                }
                if (userHasAccount) {
                  await loginHandler(formData);
                }
                setIsLoading(false);
                // history.push('/');
              }}
            >
              {userHasAccount ? 'Login' : 'Sign Up'}
            </FormButton>
          </div>
          <button
            className={classes['form__buttons--toggle-login-state']}
            type="button"
            onClick={toggleUserHasAccount}
          >
            {userHasAccount
              ? "Don't have an account? Click here!"
              : 'Got an account already? Click here!'}
          </button>
        </Form>
      </main>
      <Footer />
    </>
  );
}

export default Auth;
