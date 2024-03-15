import './About.scss';

const About: React.FC = () => {
  return (
    <>
      <section className="about">
        <div className="about__title">About US</div>

        <div className="about__contact contact">
          <div className="contact__technologies">
            <p>
              This application was developed using the React library, and same
              Redux-toolkit,Configure-store, Axios,TypeScript, JavaScript, HTML,
              SCSS, Mobile-First.
            </p>

            <p>
              Данное приложение разаработано с применением библиотеки React, а
              так же Redux-toolkit, Axios,TypeScript, JavaScript, HTML, SCSS,
              Mobile-First.
            </p>
          </div>

          <div className="contact__my-contact">
            <p>My contact:</p>
            <p>Связь со мной:</p>{' '}
            <div className="contact__my-contact-link">
              {' '}
              <p className="contact__my-contact-mail">
                Mail:{' '}
                <a
                  href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
                  target="_blank"
                  rel="noreferrer">
                  web.egorovm@gmail.com
                </a>
              </p>
              <p className="contact__my-contact-git-hub">
                GitHub:{' '}
                <a
                  href="https://github.com/SeddiMK"
                  target="_blank"
                  rel="noreferrer">
                  SeddiMK
                </a>
              </p>
              <p className="contact__my-contact-skype">
                Skype:{' '}
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
      </section>
    </>
  );
};

export default About;
