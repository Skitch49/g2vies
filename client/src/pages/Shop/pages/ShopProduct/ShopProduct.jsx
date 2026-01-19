import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProduct } from "../../../../api";
import styles from "./ShopProduct.module.scss";
import { AuthContext } from "../../../../context";
import { BsCpu } from "react-icons/bs";
import { RiRamLine } from "react-icons/ri";
import { MdStorage } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import SimilarProduct from "../../../../components/SimilarProducts/SimilarProduct";

function ShopProduct() {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [navDisplay, setNavDisplay] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { idProduct } = useParams();
  useEffect(() => {
    async function fetchProduct(idProduct) {
      try {
        const response = await getProduct(idProduct);
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct(idProduct);
  }, [idProduct]);

  const stockStatus = product?.quantity > 0 ? true : false;
  return (
    <div className="card my-20">
      <nav className="d-flex flex-row align-items-center gap-5 my-10">
        <NavLink to="/boutique">Boutique</NavLink>/
        <NavLink
          to={`/boutique/categorie-produit/${product?.category}`}
          className="active"
        >
          {product?.category}
        </NavLink>
        /<div className="fakeNavLink">{product?.name}</div>
      </nav>

      <main>
        <div className="headerProduct d-flex flex-row gap-20 flex-fill flex-wrap justify-content-center">
          <div className={`${styles.wrapperImages} `}>
            <Swiper
              modules={[Thumbs, Autoplay, Keyboard, Zoom]}
              autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true,
                disableOnInteraction: true,
              }}
              zoom={{ enabled: true, panOnMouseMove: true, toggle: true }}
              keyboard={{ enabled: true, onlyInViewport: true }}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              className={styles.mainSwiper}
            >
              {product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img src={image.url} alt={product?.name} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              className={styles.thumbsSwiper}
            >
              {product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.url} alt={product?.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={`${styles.wrapperHeaderInfos}`}>
            <h1 className={styles.productName}>{product?.name}</h1>
            <p className={styles.originalPrice}>
              Prix neuf : <span>{product?.originalPrice} €</span>
            </p>

            <h2 className={styles.price}>{product?.price} €</h2>
            <ul className={styles.productInfos}>
              <li>
                <BsCpu /> Processeur : {product?.cpu}
              </li>
              <li>
                <RiRamLine />
                RAM : {product?.ram} Go
              </li>
              <li>
                <MdStorage />
                Stockage : {product?.storage?.capacity} {product?.storage?.unit}
              </li>
              <li>{product?.condition}</li>
            </ul>
            <p className="mb-10">Garantie 24 mois</p>
            <h4>{stockStatus ? "En stock" : "Rupture de stock"}</h4>
            <div
              className={`${styles.wrapperButtons} d-flex flex-row  gap-10 mt-20`}
            >
              <button
                type="button"
                className="btn btn-primary"
                disabled={!stockStatus && !user}
              >
                Ajouter au panier
              </button>
              <button
                type="button"
                className="btn btn-primary-reverse"
                disabled={!stockStatus && !user}
              >
                Acheté
              </button>
            </div>
            <p className={styles.infoStripe}>
              <FaCreditCard />
              Paiement sécurisé par Stripe
            </p>
          </div>
        </div>
        <div>
          <nav
            className={`d-flex flex-row flex-wrap gap-10  ${styles.navInfos}`}
          >
            {product?.description && (
              <li
                onClick={() => setNavDisplay(true)}
                className={`${navDisplay ? styles.navActive : ""}`}
              >
                Description
              </li>
            )}

            <li
              onClick={() => setNavDisplay(false)}
              className={`${navDisplay ? "" : styles.navActive}`}
            >
              Informations complémentaires
            </li>
          </nav>
          {product?.description && navDisplay ? (
            <section className={styles.description}>
              <h2 className="mb-10">
                Un ultrabook puissant, compact et fiable
              </h2>
              <p>{product?.description}</p>
            </section>
          ) : (
            <section className={styles.additionalInfos}>
              <table>
                <tbody>
                  <tr>
                    <th>Processeur</th>
                    <td>{product?.cpu}</td>
                  </tr>
                  {product?.gpu && (
                    <tr>
                      <th>Carte graphique</th>
                      <td>{product?.gpu}</td>
                    </tr>
                  )}
                  <tr>
                    <th>RAM</th>
                    <td>{product?.ram} Go</td>
                  </tr>
                  <tr>
                    <th>Stockage {product?.storage?.type}</th>
                    <td>
                      {product?.storage?.capacity} {product?.storage?.unit}
                    </td>
                  </tr>
                  {product?.screenSize && (
                    <tr>
                      <th>Taille d'écran</th>
                      <td>{product?.screenSize} pouces</td>
                    </tr>
                  )}
                  {product?.operatingSystem && (
                    <tr>
                      <th>Système d'exploitation</th>
                      <td>{product?.operatingSystem}</td>
                    </tr>
                  )}

                  <tr>
                    <th>Bluetooth</th>
                    <td>{product?.bluetooth ? "Oui" : "Non"}</td>
                  </tr>
                  {product?.category.toLowerCase() === "pc portables" && (
                    <>
                      <tr>
                        <th>Caméra</th>
                        <td>{product?.webcam ? "Oui" : "Non"}</td>
                      </tr>

                      <tr>
                        <th>Microphone</th>
                        <td>{product?.microphone ? "Oui" : "Non"}</td>
                      </tr>

                      <tr>
                        <th>Numpad</th>
                        <td>{product?.numpad ? "Oui" : "Non"}</td>
                      </tr>
                    </>
                  )}
                  {product?.wifi ? (
                    <tr>
                      <th>Wi‑Fi</th>
                      <td>Oui</td>
                    </tr>
                  ) : (
                    <tr>
                      <th>Ethernet</th>
                      <td>Oui</td>
                    </tr>
                  )}
                  {product?.color && (
                    <tr>
                      <th>Couleur</th>
                      <td>{product?.color}</td>
                    </tr>
                  )}
                  {product?.weight && (
                    <tr>
                      <th>Poids</th>
                      <td>{product?.weight} g</td>
                    </tr>
                  )}
                  {product?.connectors.length > 0 && (
                    <tr>
                      <th>Connectique</th>
                      <td
                        className={`${styles.connectors} d-flex flex-row flex-wrap`}
                      >
                        {product?.connectors.map((connector, index) => (
                          <span key={index}>
                            {connector?.quantity}x {connector?.name}
                            &nbsp;
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th>Catégorie</th>
                    <td>{product?.category}</td>
                  </tr>
                  <tr>
                    <th>Marque</th>
                    <td>{product?.brand}</td>
                  </tr>
                  <tr>
                    <th>Modèle</th>
                    <td>{product?.model}</td>
                  </tr>
                  <tr>
                    <th>État</th>
                    <td>{product?.condition}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
        </div>
        <h2 className={styles.titleSimilarProduct}>Produits similaires</h2>
        <SimilarProduct productID={product?._id} />
      </main>
    </div>
  );
}
export default ShopProduct;
