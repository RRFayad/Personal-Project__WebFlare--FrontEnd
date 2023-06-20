import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <a href="https://api.whatsapp.com/send?phone=5511992861954&text=">
        Contact Me
      </a>
      <p>RRFayad ©</p>
    </footer>
  );
}

export default Footer;
