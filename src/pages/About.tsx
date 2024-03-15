/* eslint-disable jsx-a11y/iframe-has-title */
const About: React.FC = () => {
  return (
    <>
      <section className="about">
        <br />
        <div className="about__title">About US</div>
        <br />
        <div className="about__text">
          <p>
            This application was developed using the React library, and same
            Redux-toolkit,Configure-store, Axios,TypeScript, JavaScript, HTML,
            SCSS, Mobile-First.
          </p>
          <br />
          <p>
            Данное приложение разаработано с применением библиотеки React, а так
            же Redux-toolkit, Axios,TypeScript, JavaScript, HTML, SCSS,
            Mobile-First.
          </p>
          <br />
          <p>My contact:</p>
          <p>Связь со мной:</p>
          <br />

          <p>
            Mail:{' '}
            <a
              href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
              target="_blank"
              rel="noreferrer">
              web.egorovm@gmail.com
            </a>
          </p>
          <br />
          <p>
            GitHub:{' '}
            <a
              href="https://github.com/SeddiMK"
              target="_blank"
              rel="noreferrer">
              SeddiMK
            </a>
          </p>
          <br />
          <p>
            Skype:{' '}
            <a
              href="skype:live:.cid.985f030235657018?add"
              target="_blank"
              rel="noreferrer">
              Maksim Egorov
            </a>
          </p>
          <br />
        </div>
        <br />
      </section>
    </>
  );
};

export default About;
