import './Contacts.scss';
import mailLogo from '../../assets/image/icon/gmail.png';
import githubLogo from '../../assets/image/icon/gitHub.png';
import skypeLogo from '../../assets/image/icon/skype.png';

const Contacts: React.FC = () => {
  return (
    <div className="contacts">
      <div className="contact__my-contact">
        <p>My contact: click link to bottom.</p>
        <p>Связь со мной: нажмите на ссылку внизу &darr;</p>
        <div className="contact__my-contact-link">
          <div className="contact__my-contact-mail my-contact">
            <b>Mail:</b>{' '}
            <div className="contact__icon icon-wrp">
              <img className="contact__icon img" src={mailLogo} alt="mail" />
            </div>
            <a
              href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
              target="_blank"
              rel="noreferrer">
              web.egorovm@gmail.com
            </a>
          </div>
          <div className="contact__my-contact-git-hub my-contact">
            <b>GitHub:</b>{' '}
            <div className="contact__icon icon-wrp">
              <img
                className="contact__icon img"
                src={githubLogo}
                alt="gitHub"
              />
            </div>
            <a
              href="https://github.com/SeddiMK"
              target="_blank"
              rel="noreferrer">
              SeddiMK
            </a>
          </div>
          <div className="contact__my-contact-skype my-contact">
            <b>Skype:</b>{' '}
            <div className="contact__icon icon-wrp">
              <img className="contact__icon img" src={skypeLogo} alt="gitHub" />
            </div>
            <a
              href="skype:live:.cid.985f030235657018?add"
              target="_blank"
              rel="noreferrer">
              Maksim Egorov
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
