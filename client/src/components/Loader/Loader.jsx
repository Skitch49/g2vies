import styles from "./Loader.module.scss";
import { RiLoader2Fill } from "react-icons/ri";

function Loader() {
  return <RiLoader2Fill className={styles.loader} />;
}
export default Loader;
