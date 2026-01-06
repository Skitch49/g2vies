import { FaInfoCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";
import { TbAlertCircle } from "react-icons/tb";
import styles from "./Alert.module.scss";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

function Alert({ state, ref, value, onClose, duration = 5 }) {
  const [count, setCount] = useState(duration);
  let Icon;
  let alertClass;

  switch (state) {
    case "success":
      Icon = IoMdCheckmarkCircleOutline;
      alertClass = styles.success;
      break;

    case "warning":
      Icon = FiAlertTriangle;
      alertClass = styles.warning;
      break;

    case "danger":
      Icon = TbAlertCircle;
      alertClass = styles.danger;
      break;

    case "info":
    default:
      Icon = FaInfoCircle;
      alertClass = styles.info;
      break;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      if (onClose) {
        onClose();
      }
    }
  }, [count, onClose]);
  return (
    <div className={`${alertClass}  ${styles.alertContainer}`} ref={ref}>
      <Icon />
      {value}
      <button className={styles.closeBtn} onClick={onClose}>
        <IoMdClose />
      </button>
    </div>
  );
}
export default Alert;
