import styles from "./MentionsLegales.module.scss";
function MentionsLegales() {
  return (
    <div className="container-xs d-flex flex-fill align-items-center justify-content-center">
      <div className="card mx-10">
        <div className="p-10">
          <h1 className="mb-20 text-center">Mentions légales</h1>
          <div className={styles.items}>
            <h2>1. Éditeur du site</h2>
            <ul>
              <li>
                <span>Nom de l’entreprise</span>: G2vies
              </li>
              <li>
                <span>Statut juridique</span>: Auto-entrepreneur
              </li>
              <li>
                <span>Adresse du siège social</span>: G2VIES 6 rue Guillaume
                Lekeu, Bâtiment 19 PEPINA, 49100 Angers
              </li>
              <li>
                <span>Numéro SIRET</span>: 940 921 430 00010
              </li>
              <li>
                <span>E-mail</span>: contact@g2vies.fr
              </li>
              <li>
                <span>Téléphone</span>: 07 85 97 51 00
              </li>
              <li>
                <span>Directeur de publication</span>: BONHOMME Amaury
              </li>
            </ul>
          </div>
          <div className={styles.items}>
            <h2>2. Hébergement du site</h2>
            <ul>
              <li>
                <span>Hébergeur</span>: OVH SAS
              </li>
              <li>
                <span>Adresse</span>: 2 rue Kellermann, 59100 Roubaix
              </li>
              <li>
                <span>Téléphone</span>: 09 72 10 10 07
              </li>
              <li>
                <span>Site web</span>: https://www.ovhcloud.com/fr/
              </li>
            </ul>
          </div>
          <div className={styles.items}>
            <h2>3. Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus présents sur ce site (textes, images,
              vidéos, logos, éléments graphiques) sont la propriété exclusive de
              G2vies, sauf mention contraire. Toute reproduction ou utilisation
              sans autorisation est interdite conformément aux dispositions du
              Code de la propriété intellectuelle.
            </p>
          </div>
          <div className={styles.items}>
            <h2>4. Protection des données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), nous nous engageons à respecter la confidentialité des
              informations collectées auprès des visiteurs et clients du site.
            </p>
            <ul>
              <li>
                <span>Données collectées</span>: Nom, adresse e-mail, numéro de
                téléphone, adresse de livraison.
              </li>
              <li>
                <span>Finalité</span>: Gestion des commandes, service client,
                newsletter (si applicable).
              </li>
              <li>
                <span>Droit d’accès et de suppression</span>: Vous pouvez
                demander la modification ou suppression de vos données en nous
                contactant à{" "}
                <a href="mailto:contact@g2vies.fr">contact@g2vies.fr</a>.
              </li>
              <li>
                <span>Cookies</span>: Notre site utilise des cookies pour
                améliorer l’expérience utilisateur. Vous pouvez gérer ces
                paramètres via les préférences de votre navigateur.
              </li>
            </ul>
          </div>
          <div className={styles.items}>
            <h2>5. Conditions de vente</h2>
            <p>
              Les produits vendus sur ce site sont des équipements
              reconditionnés. Nos Conditions Générales de Vente (CGV)
              définissent les modalités de paiement, livraison, retour et
              garantie. Vous pouvez consulter nos CGV.
            </p>
          </div>
          <div className={styles.items}>
            <h2>6. Responsabilité</h2>
            <p>
              L’éditeur du site ne peut être tenu responsable des dommages
              directs ou indirects résultant de l’utilisation du site ou de
              l’achat des produits vendus. En cas de problème, nous vous
              invitons à nous contacter à{" "}
              <a href="mailto:contact@g2vies.fr">contact@g2vies.fr</a>.
            </p>
          </div>
          <div className={styles.items}>
            <h2>7. Contact</h2>
            <p>
              Pour toute question ou demande concernant ces mentions légales,
              vous pouvez nous contacter via :
            </p>
            <ul>
              <li>
                <span>📧 E-mail </span>: contact@g2vies.fr
              </li>
              <li>
                <span>📞 Téléphone </span>: 07 85 97 51 00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MentionsLegales;
