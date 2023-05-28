import React, { useContext, useState } from 'react';

import DataContext from '../../../shared/context/DummyDataContext';
import Form from '../../../shared/ui-ux/Form';
import FormButton from '../../../shared/ui-ux/FormButton';
import FormInput from '../../../shared/ui-ux/FormInput';
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

  const createHandler = () => {
    console.log('ihaa - Create');
  };

  const deleteHandler = (event) => {
    console.log('ihaa - delete');
  };

  return (
    <Form>
      <div className={classes.form__inputs}>
        <FormInput
          labelValue="Title"
          HTMLElement="input"
          name="title"
          type="text"
          validation={(value) => value.length <= 3}
        />
        <FormInput
          labelValue="Image URL"
          HTMLElement="input"
          name="image"
          type="text"
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
        />
        <FormInput
          labelValue="Monthly Revenue"
          HTMLElement="input"
          type="number"
          name="revenue"
        />
        <FormInput
          labelValue="Monthly Profit"
          HTMLElement="input"
          type="number"
          name="profit"
        />
        <FormInput
          labelValue="Asking Price"
          HTMLElement="input"
          type="number"
          name="price"
        />
        <FormInput
          labelValue="Description"
          HTMLElement="textarea"
          name="description"
        />
      </div>
      <div className={classes.form__buttons}>
        <FormButton caution onClick={deleteHandler}>
          Delete
        </FormButton>
        <FormButton onClick={createHandler}>Create</FormButton>
      </div>
    </Form>
  );
}

export default NewBusinessForm;
