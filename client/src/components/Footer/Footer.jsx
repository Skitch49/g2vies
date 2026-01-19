import { FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-column align-items-center justify-content-center p-20`}
    >
      <div className="d-flex flex-row flex-wrap  mb-10 gap-20">
        <div className={styles.footerSection}>
          <div className="d-flex flex-row flex-wrap gap-20 align-items-center">
            <a href="https://www.linkedin.com/company/g2vies/">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h4>Informations</h4>
          <ul>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/boutique">Boutique</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>BESOIN D'AIDE ?</h4>
          <ul>
            <li>
              <NavLink to="/">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/">Mentions légales</NavLink>
            </li>
            <li>
              <NavLink to="/">Conditions Générales de Ventes (CGV)</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className={styles.copyright}>
          © 2025 Ordinateurs portables reconditionnés Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
