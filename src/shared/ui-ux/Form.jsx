import React, { useContext } from 'react';

import DataContext from '../context/DummyDataContext';
import classes from './Form.module.css';

function Form(props) {
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
    if (props.onSubmit) {
      props.onSubmit();
    } else {
      console.log('ihaa');
    }
  };
  return (
    <form className={classes.form}>
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
        <input type="text" name="revenue" id="revenue" />
      </label>
      <label htmlFor="profit">
        Monthly Profit
        <input type="text" name="profit" id="profit" />
      </label>
      <label htmlFor="price">
        Asking Price
        <input type="text" name="price" id="price" />
      </label>
      <label htmlFor="description">
        Description
        <textarea name="description" id="description" cols="30" rows="10" />
      </label>
      <div className={classes.form__buttons}>
        <button
          type="button"
          className={`${classes.form__button} ${classes['form__button--delete']}`}
        >
          Delete
        </button>
        <button
          className={`${classes.form__button} ${classes['form__button--create']}`}
          type="button"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default Form;
