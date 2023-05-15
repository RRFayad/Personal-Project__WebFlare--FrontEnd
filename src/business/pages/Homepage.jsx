import React from 'react';

import Navbar from '../../shared/navigation/Navbar';
import MainContent from '../components/MainContent';
import Footer from '../../shared/navigation/Footer';
import Sidebar from '../components/Sidebar';

function Homepage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <MainContent />
      <Footer />
    </>
  );
}

export default Homepage;
