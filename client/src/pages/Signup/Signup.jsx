import styles from "./Signup.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../../api/users";
import { Navigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

function Signup() {
  const { user, signin } = useContext(AuthContext);

  const validationSchema = yup.object({
    firstname: yup
      .string()
      .required("Votre prénom est obligatoire !")
      .min(2, "Votre prénom est trop court !")
      .max(60, "Votre prénom est trop long !"),
    lastname: yup
      .string()
      .required("Votre nom est obligatoire !")
      .min(2, "Votre nom est trop court !")
      .max(60, "Votre nom est trop long !"),
    email: yup
      .string()
      .email("Ceci n'est pas un email valide !")
      .required("Votre email est obligatoire !"),
    password: yup
      .string()
      .required("Votre mot de passe est obligatoire !")
      .min(6, "Votre mot de passe doit avoir 6 caratères minimum !")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial !"
      ),
    confirmPassword: yup
      .string()
      .required("Votre mot de passe est obligatoire !")
      .min(6, "Votre mot de passe doit avoir 6 caratères minimum !")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial !"
      )
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
  });

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  async function submit(values) {
    try {
      clearErrors();

      // Déstructuration pour enlever confirmPassword
      const { confirmPassword: _confirmPassword, ...newValues } = values;
      await createUser(newValues);
      const { email, password } = newValues;
      await signin({ email, password });
    } catch (message) {
      console.error(message);
      setError("generic", { type: "generic", message });
    }
  }
  return user ? (
    <Navigate to="/profile"></Navigate>
  ) : (
    <div className="d-flex flex-fill align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit(submit)}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Inscription</h2>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="firstname">Prénom</label>
          <input {...register("firstname")} type="text" id="firstname" />
          {errors.firstname && (
            <p className="form-error">{errors.firstname.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="lastname">Nom</label>
          <input {...register("lastname")} type="text" id="lastname" />
          {errors.lastname && (
            <p className="form-error">{errors.lastname.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="text" id="email" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="password">Mot de passe</label>
          <PasswordInput nameValue={"password"} register={register} />{" "}
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="confirmPassword">Confirmation de mot de passe</label>
          <PasswordInput
            nameValue={"confirmPassword"}
            register={register}
          />{" "}
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>
        {errors.generic && (
          <p className="form-error">{errors.generic.message}</p>
        )}
        <div className={styles.infoConnexion}>
          <p>Vous avez déjà un compte ?</p>
          <NavLink to="/signin">Connectez-vous juste ici</NavLink>
        </div>
        <div>
          <button disabled={isSubmitting} className="btn btn-primary">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}
export default Signup;
