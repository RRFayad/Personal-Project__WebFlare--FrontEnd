import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import classes from './NewBusiness.module.css';
import BusinessForm from '../components/NewBusiness/BusinessForm';

function EditBusiness() {
  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <BusinessForm />
      </main>
      <Footer />
    </>
  );
}

export default EditBusiness;
