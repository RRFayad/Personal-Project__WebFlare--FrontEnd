import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import NewOfferForm from '../components/NewOffer/NewOfferForm';
import classes from './NewOffer.module.css';

function NewOffer() {
  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <NewOfferForm />
      </main>
      <Footer />
    </>
  );
}

export default NewOffer;
