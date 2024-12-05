import "./Footer.scss";
import { useState, useEffect } from "react";

function Footer() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`footer ${!scrollingDown ? "visible" : "hidden"}`}>
      <h3 className="footer__title">Developer Contact Info:</h3>
      <ul className="footer__list">
        <li className="footer__item">
          <a
            className="footer__item-icon-link"
            href="mailto:adamdebrouwere@hotmail.com"
          >
            <img
              className="footer__item-icon"
              src="./images/icons/email.svg"
              alt="email icon"
            />
          </a>
          <a
            className="footer__item-link"
            href="mailto:adamdebrouwere@hotmail.com"
          >
            adamdebrouwere@hotmail.com
          </a>
        </li>

        <li className="footer__item">
          <a
            className="footer__item-icon-link"
            href="https://www.linkedin.com/in/adamdebrouwere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer__item-icon"
              src="./images/icons/linkedin.svg"
              alt="linkedIn icon"
            />
          </a>

          <a
            className="footer__item-link"
            href="https://www.linkedin.com/in/adamdebrouwere"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/adamdebrouwere
          </a>
        </li>
        <li className="footer__item">
          <a
            className="footer__item-icon-link"
            href="https://github.com/adamdebrouwere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="footer__item-icon"
              src="./images/icons/git.svg"
              alt="git icon"
            />
          </a>

          <a
            className="footer__item-link"
            href="https://github.com/adamdebrouwere"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/adamdebrouwere
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
