import styles from "./CGV.module.scss";
function CGV() {
  return (
    <div className="container-xs d-flex flex-fill align-items-center justify-content-center">
      <div className="card mx-10">
        <div className="p-10">
          <h1 className="mb-20 text-center">
            Conditions Générales de Vente (CGV)
          </h1>
          <div className={styles.items}>
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) définissent les
              droits et obligations des parties dans le cadre de la vente de
              produits reconditionnés proposés par <strong>G2vies</strong>, dont
              le siège social est situé à
              <strong>
                6 rue Guillaume Lekeu, Bâtiment 19 PEPINA, 49100 Angers
              </strong>
              immatriculée sous le numéro <strong>940 921 430 00010</strong>.
            </p>
          </div>
          <div className={styles.items}>
            <h2>2. Produits</h2>
            <p>
              Les produits proposés sont des équipements reconditionnés
              vérifiés, testés et garantis. Chaque article est accompagné d’une
              fiche descriptive précisant son état, ses caractéristiques et sa
              garantie.
            </p>
          </div>
          <div className={styles.items}>
            <h2>3. Prix</h2>
            <p>
              Les prix sont indiqués en euros (€), toutes taxes comprises (TTC).
              <strong>G2vies</strong> se réserve le droit de modifier les prix à
              tout moment, mais les produits seront facturés au tarif en vigueur
              au moment de la validation de la commande.
            </p>
          </div>
          <div className={styles.items}>
            <h2>4. Commande</h2>
            <p>Le processus de commande comprend plusieurs étapes :</p>
            <ul>
              <li>1. Sélection des produits et ajout au panier.</li>
              <li>2. Validation du panier et choix du mode de livraison.</li>
              <li>3. Paiement sécurisé.</li>
              <li>4. Confirmation de la commande par e-mail.</li>
            </ul>
          </div>
          <div className={styles.items}>
            <h2>5. Paiement</h2>
            <p>
              Le paiement s’effectue en ligne via les moyens suivants : Carte
              bancaire, PayPal, virement. Toute commande sera expédiée après
              réception du paiement intégral.
            </p>
          </div>
          <div className={styles.items}>
            <h2>6. Livraison</h2>
            <p>
              Les produits sont expédiés sous <strong>96 heures</strong> ouvrés
              après validation du paiement. Les frais et délais de livraison
              varient selon la destination et le mode de transport choisi.
              <strong>G2vies</strong> ne pourra être tenu responsable des
              éventuels retards imputables aux transporteurs.
            </p>
          </div>
          <div className={styles.items}>
            <h2>7. Droit de rétractation</h2>
            <p>
              Conformément aux dispositions légales en vigueur, l’acheteur
              dispose d’un délai de <strong>14 jours</strong> à compter de la
              réception du produit pour exercer son droit de rétractation, sans
              avoir à justifier sa décision. Les frais de retour sont à la
              charge du client, sauf exception indiquée.
            </p>
          </div>
          <div className={styles.items}>
            <h2>8. Garantie et SAV</h2>
            <p>
              Les produits bénéficient d’une garantie de
              <strong>24 mois</strong> couvrant les défauts de fabrication et
              les dysfonctionnements non liés à une mauvaise utilisation. En cas
              de problème, l’acheteur est invité à contacter le service
              après-vente via
              <a href="mailto:contact@g2vies.fr">contact@g2vies.fr</a>.
            </p>
          </div>
          <div className={styles.items}>
            <h2>9. Responsabilité</h2>
            <p>
              <strong>G2vies</strong> ne saurait être tenue responsable en cas
              de :
            </p>
            <ul>
              <li>Mauvaise utilisation du produit.</li>
              <li>
                Dommages indirects résultant de l’achat ou de l’utilisation du
                produit.
              </li>
              <li>Indisponibilité temporaire du site internet.</li>
            </ul>
          </div>
          <div className={styles.items}>
            <h2>10. Protection des données</h2>
            <p>
              Les données personnelles collectées lors d’une commande sont
              utilisées exclusivement pour le traitement de la transaction et ne
              seront en aucun cas cédées à des tiers sans consentement
              préalable. Pour toute demande de suppression ou modification des
              données, merci de contacter
              <a href="mailto:contact@g2vies.fr">contact@g2vies.fr</a>.
            </p>
          </div>
          <div className={styles.items}>
            <h2>11. Loi applicable et litiges</h2>
            <p>
              Les présentes CGV sont régies par la loi française. En cas de
              litige, une solution amiable sera privilégiée avant toute action
              judiciaire devant les tribunaux compétents.
            </p>
          </div>
          <div className={styles.items}>
            <h2>12. Contact</h2>

            <ul>
              <li>
                <span>📧 E-mail</span> : contact@G2vies.fr
              </li>
              <li>
                <span>📞 Téléphone</span> : 07 85 97 51 00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CGV;
