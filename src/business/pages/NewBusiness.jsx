import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import classes from './NewBusiness.module.css';
import NewBusinessForm from '../components/NewBusiness/NewBusinessForm';

function NewBusiness() {
  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <NewBusinessForm />
      </main>
      <Footer />
    </>
  );
}

export default NewBusiness;
