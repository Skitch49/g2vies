import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./PasswordInput.module.scss";
function PasswordInput({ nameValue, register }) {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }

  return (
    <div className={styles.passwordContainer}>
      <input
        {...register(nameValue)}
        type={show ? "text" : "password"}
        id={nameValue}
      />
      <span>
        {show ? (
          <FaEyeSlash onClick={handleClick} />
        ) : (
          <FaEye onClick={handleClick} />
        )}
      </span>
    </div>
  );
}

export default PasswordInput;
