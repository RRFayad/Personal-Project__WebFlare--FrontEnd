import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import BusinessContext from '../../shared/context/BusinessContext';
import FormButton from '../../shared/ui-ux/FormButton';
import LoadingSpinner from '../../shared/ui-ux/LoadingSpinner';
import classes from './ConfirmModal.module.css';
import AuthContext from '../../shared/context/AuthContext';

function ConfirmModal(props) {
  const { deleteBusiness } = useContext(BusinessContext);
  const { tokenValue } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      {isLoading && <LoadingSpinner overlay />}
      <header className={classes.modal__header}>
        <h2 className={classes.modal__title}>Are you sure?</h2>
        {props.onClick && (
          <button type="button" onClick={props.onClick}>
            &times;
          </button>
        )}
      </header>
      <main className={classes.modal__main}>
        <p className={classes.modal__message}>
          Are you sure you want to delete the "{props.business.title}" business
          from your assets list?
        </p>
      </main>
      <hr />
      <footer className={classes.modal__footer}>
        <FormButton
          caution
          onClick={async () => {
            setIsLoading(true);
            await deleteBusiness(props.business.id, tokenValue);
            setIsLoading(false);
            history.push('/');
          }}
        >
          Delete
        </FormButton>
      </footer>
    </div>,
    document.querySelector('#modal')
  );
}

export default ConfirmModal;
