import Sidebar from './Sidebar';
import BusinessList from './BusinessList';
import classes from './MainContent.module.css';

function MainContent() {
  return (
    <div className={`${classes['main-container']}`}>
      <Sidebar />
      <BusinessList />
    </div>
  );
}

export default MainContent;
