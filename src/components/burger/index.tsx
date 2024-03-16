import './Burger.scss';

import React, { useEffect, useState } from 'react';

type burgerProps = {
  // burgerClickMenu: (i: boolean) => void;
  burgerClick: boolean;
  setBurgerClick: (i: boolean) => void;
  onClick: any;
};

const Burger: React.FC<burgerProps> = ({
  onClick,
  burgerClick,
  setBurgerClick,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  // setBurgerClick(true);
  useEffect(() => {
    console.log(isClosed, 'isClosed---------------');
    setIsClosed(burgerClick);
  }, [burgerClick]);

  const handlerBtn = () => {
    setIsClosed(!isClosed);
    console.log(isClosed, 'isClosed---------------');
    setBurgerClick(isClosed);
  };

  // () => setBurgerClick(isClosed)   onClick={onClick}
  return (
    <>
      <div
        id="hamburger"
        onClick={() => handlerBtn()}
        className={'hamburglar ' + (!isClosed ? 'is-closed' : 'is-open')}>
        <div className="burger-icon">
          <div className="burger-container">
            <span className="burger-bun-top"></span>
            <span className="burger-filling"></span>
            <span className="burger-bun-bot"></span>
          </div>
        </div>

        {/* <!-- svg ring containter --> */}
        <div className="burger-ring">
          <svg className="svg-ring">
            <path
              className="path"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="4"
              d="M 22.66 1.33 C 10.86 1.33 1.33 10.86 1.33 22.66 s 9.53 21.33 21.33 21.33 s 21.33 -9.53 21.33 -21.33 S 34.46 1.33 22.66 1.33"
            />
          </svg>
        </div>
        {/* <!-- the masked path that animates the fill to the ring --> */}

        <svg width="0" height="0">
          <mask id="mask">
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#ff0000"
              strokeMiterlimit="10"
              strokeWidth="4"
              d="M 22.66 1.33 c 7.73 0 14.53 4.13 18.26 10.33 c 1.93 3.2 3.33 11 -6.26 11 h -2.6"
            />
          </mask>
        </svg>
        <div className="path-burger">
          <div className="animate-path">
            <div className="path-rotation"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Burger;
function burgerClick(): any {
  throw new Error('Function not implemented.');
}
