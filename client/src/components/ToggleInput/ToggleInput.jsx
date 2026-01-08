import styles from "./ToggleInput.module.scss";
function ToggleInput({ label, name, register }) {
  return (
    <div className=" d-flex flex-row mb-5 align-items-center justify-flex-end">
      <h4 className="mr-10">{label}</h4>
      <label htmlFor={name} className={styles.switch}>
        <input
          className={styles.inputToggle}
          type="checkbox"
          {...register(name)}
          id={name}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
export default ToggleInput;
