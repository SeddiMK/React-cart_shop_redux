import './Footer.scss';
import mailLogo from '../../assets/image/icon/gmail.png';
import githubLogo from '../../assets/image/icon/gitHub.png';
import skypeLogo from '../../assets/image/icon/skype.png';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__wraper">
        <div className="footer__logo">
          <Link to="/" className="header__logo">
            ME
            {/* <img src="#" alt="Image logo" /> */}
          </Link>
        </div>
        <div className="footer__link">
          <div className="footer__about-us">
            <Link to="/about">About us</Link>
          </div>
          <div className="footer__contacts">
            <Link to="/contacts">Contacts</Link>
          </div>
        </div>
        <div className="footer__link-icon">
          <div className="contact__icon icon-wrp">
            <img className="contact__icon img" src={mailLogo} alt="gitHub" />
          </div>
          <div className="contact__icon icon-wrp">
            <img className="contact__icon img" src={githubLogo} alt="gitHub" />
          </div>
          <div className="contact__icon icon-wrp">
            <img className="contact__icon img" src={skypeLogo} alt="gitHub" />
          </div>
        </div>
      </div>
      <hr
        style={{
          background: 'black',
          height: '1px',
        }}
      />

      <div className="footer__copy-text">&copy; 2024 Copyright Text</div>
    </footer>
  );
};

export default Footer;
