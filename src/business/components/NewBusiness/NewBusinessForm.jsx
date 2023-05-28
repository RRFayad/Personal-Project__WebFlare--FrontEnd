import React, { useContext, useState } from 'react';

import DataContext from '../../../shared/context/DummyDataContext';
import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import classes from './NewBusinessForm.module.css';

function NewBusinessForm() {
  const { businessTypesOptions, nichesOptions } = useContext(DataContext);

  const typesOptionsContent = businessTypesOptions.map((item) => (
    <option key={item} value="">
      {item}
    </option>
  ));

  const nichesOptionsContent = nichesOptions.map((item) => (
    <option key={item} value="">
      {item}
    </option>
  ));

  const submitHandler = () => {
    console.log('ihaa');
  };

  return (
    <Form>
      <label htmlFor="title">
        Title
        <input type="text" name="title" id="title" />
      </label>
      <label htmlFor="image">
        Image URL
        <input type="text" name="image" id="image" />
      </label>
      <label htmlFor="type">
        Type of Business
        <select name="type" id="type">
          {typesOptionsContent}
        </select>
      </label>
      <label htmlFor="niche">
        Niche
        <select name="niche" id="niche">
          {nichesOptionsContent}
        </select>
      </label>
      <label htmlFor="age">
        Age of the Business
        <input type="number" id="age" name="age" />
      </label>
      <label htmlFor="revenue">
        Monthly Revenue
        <input type="number" name="revenue" id="revenue" />
      </label>
      <label htmlFor="profit">
        Monthly Profit
        <input type="number" name="profit" id="profit" />
      </label>
      <label htmlFor="price">
        Asking Price
        <input type="number" name="price" id="price" />
      </label>
      <label htmlFor="description">
        Description
        <textarea name="description" id="description" cols="30" rows="10" />
      </label>
      <div className={classes.form__buttons}>
        <FormButton caution>Delete</FormButton>
        <FormButton>Create</FormButton>
      </div>
    </Form>
  );
}

export default NewBusinessForm;
