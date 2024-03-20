import './Contacts.scss';

const Contacts: React.FC = () => {
  return (
    <div className="contacts">
      <div className="contact__my-contact">
        <p>My contact: click link to bottom.</p>
        <p>Связь со мной: нажмите на ссылку внизу.</p>
        <div className="contact__my-contact-link">
          <p className="contact__my-contact-mail">
            <b>Mail:</b>{' '}
            <a
              href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
              target="_blank"
              rel="noreferrer">
              web.egorovm@gmail.com
            </a>
          </p>
          <p className="contact__my-contact-git-hub">
            <b>GitHub:</b>{' '}
            <a
              href="https://github.com/SeddiMK"
              target="_blank"
              rel="noreferrer">
              SeddiMK
            </a>
          </p>
          <p className="contact__my-contact-skype">
            <b>Skype:</b>{' '}
            <a
              href="skype:live:.cid.985f030235657018?add"
              target="_blank"
              rel="noreferrer">
              Maksim Egorov
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
