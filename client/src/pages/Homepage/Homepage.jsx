import { NavLink } from "react-router-dom";
import styles from "./Homepage.module.scss";
import SimilarProduct from "../../components/SimilarProducts/SimilarProduct";

function Homepage() {
  return (
    <div className="container">
      <div className="d-flex flex-column">
        <section className={styles.firstSection}>
          <div className={`${styles.wrapperTitle} d-flex flex-column`}>
            <h1>Ordinateurs portables reconditionnés – Garantie 24 mois</h1>
            <p>
              <strong>
                Des PC testés, vérifiés et remis à neuf par des professionnels.
                Performants, fiables et jusqu’à 40 % moins chers que le neuf.
              </strong>
            </p>
          </div>
          <div
            className={`${styles.wrapperInfos} d-flex justify-content-center`}
          >
            <div className={styles.firstSectionItem}>
              <h3>🔧Qualité Garantie</h3>
              <p>
                Chaque ordinateur est testé, nettoyé et remis à neuf selon un
                processus rigoureux comprenant plus de 30 points de contrôle. Tu
                reçois un appareil fiable, performant et prêt à l’emploi.
              </p>
            </div>
            <div className={styles.firstSectionItem}>
              <h3>🔒Garantie 24 mois</h3>
              <p>
                Tous nos produits sont couverts par une garantie longue durée de
                24 mois. C’est deux fois plus que la majorité des vendeurs de
                reconditionné, pour une tranquillité d’esprit totale.
              </p>
            </div>
            <div className={styles.firstSectionItem}>
              <h3>🌱 Écologique & Économique</h3>
              <ul>
                <li>
                  Jusqu’à <strong>50 % d’économies</strong> par rapport au neuf
                </li>
                <li>
                  Jusqu’à <strong>80 % d’émissions CO₂ en moins</strong> grâce
                  au reconditionné
                </li>
              </ul>
            </div>
            <div className={styles.firstSectionItem}>
              <h3>🚚 Livraison rapide & sécurisée</h3>
              <p>
                Nous expédions rapidement partout en France avec un emballage
                renforcé pour protéger ton matériel. Ton PC arrive prêt à être
                utilisé.
              </p>
            </div>
          </div>
          <div className="d-flex">
            <NavLink to="/boutique" className="btn btn-primary">
              Acheter maintenant
            </NavLink>
          </div>
        </section>
        <section className={styles.secondSection}>
          <h2>Notre sélection de produits reconditionnés</h2>
          <SimilarProduct />
        </section>
        <section className={styles.thirdSection}>
          <figure>
            <img
              src="./homepage-third-section.jpg"
              alt="G2Vies produits reconditionnés"
            />
          </figure>

          <div className={styles.thirdSectionContent}>
            <h2>G2Vies – Spécialiste du PC portable reconditionné</h2>

            <p>
              <strong>G2Vies</strong> donne une seconde vie aux ordinateurs
              portables en proposant des
              <strong>PC reconditionnés professionnels</strong>, testés,
              vérifiés et garantis <strong>24 mois</strong>. Notre objectif :
              offrir des ordinateurs fiables, performants et accessibles, tout
              en réduisant l’impact environnemental.
            </p>

            <p>
              Chaque PC est contrôlé par nos techniciens : tests complets,
              nettoyage, remplacement des pièces défectueuses et installation
              d’un <strong>Windows 11 optimisé</strong>. Vous recevez un
              ordinateur prêt à l’emploi et durable.
            </p>

            <p>
              Découvrez notre sélection de
              <strong>PC portables reconditionnés</strong> adaptés à la
              bureautique, au télétravail, aux études ou à un usage
              professionnel. Lenovo, HP, Dell, ThinkPad… des modèles performants
              à prix réduit.
            </p>
            <p>Choisir G2Vies, c’est faire le choix d’un achat malin :</p>

            <ul>
              <li>
                Jusqu’à <strong>40 % d’économies</strong> par rapport au neuf
              </li>
              <li>
                <strong>Garantie 24 mois incluse</strong>
              </li>
              <li>Un achat responsable et écologique</li>
            </ul>
            <p>
              Que vous soyez particulier, étudiant ou professionnel, nous vous
              accompagnons dans le choix du PC idéal. Découvrez nos modèles
              disponibles et profitez d’un matériel fiable, durable et
              reconditionné avec soin.
            </p>
          </div>
        </section>
        <section className={styles.fourSection}>
          <h2>Avantages du reconditionné</h2>
          <div className={styles.fourSectionContent}>
            <div>
              <h3>Économies jusqu’à 50 %</h3>
              <p>
                Profitez de performances professionnelles à prix réduit. Nos
                ordinateurs reconditionnés coûtent{" "}
                <strong>30 à 50 % moins cher</strong> que le neuf, tout en
                offrant une qualité équivalente grâce à un reconditionnement
                rigoureux. Un choix malin pour votre budget.
              </p>
            </div>
            <div>
              <h3>Impact écologique réduit</h3>
              <p>
                En choisissant le reconditionné, vous réduisez jusqu’à{" "}
                <strong>80 % des émissions de CO₂</strong> liées à la
                fabrication d’un appareil neuf. Moins de déchets électroniques,
                moins d’extraction de matières premières, plus de durabilité. Un
                geste simple pour la planète.
              </p>
            </div>
            <div>
              <h3>Fiabilité testée</h3>
              <p>
                Chaque appareil passe plus de
                <strong> 30 points de contrôle</strong> : tests matériels,
                nettoyage, vérifications complètes. Vous recevez un produit
                fiable, prêt à l’emploi et couvert par une
                <strong>garantie de 24 mois</strong>. La tranquillité d’esprit
                incluse.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.fiveSection}>
          <div>
            <figure>
              <img
                src="/homepage-five-section-pc-portable.png"
                alt="PC Portables"
              />
            </figure>
            <div>
              <h2>Ordinateurs portables</h2>
              <NavLink to="/boutique" className="btn btn-primary">
                Acheter maintenant
              </NavLink>
            </div>
          </div>
          <div>
            <figure>
              <img src="homepage-five-section-pc-fixe.jpg" alt="PC Fixes" />
            </figure>
            <div>
              <h2>Ordinateurs fixes</h2>

              <NavLink to="/boutique" className="btn btn-primary">
                Acheter maintenant
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Homepage;
