import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <a
        href="https://api.whatsapp.com/send?phone=5511992861954&text=Hi%21%20I%20liked%20your%20WebFlare%20Project%2C%20and%20would%20like%20to%20schedule%20a%20quick%20call%21"
        target="_blank"
        rel="noreferrer"
      >
        Contact Me
      </a>
      <p>RRFayad ©</p>
    </footer>
  );
}

export default Footer;
