import { useForm } from "react-hook-form";
import styles from "./Signin.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate, NavLink } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

function Signin() {
  const { signin, user } = useContext(AuthContext);
  const validationSchema = yup.object({
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
  });

  const defaultValues = {
    email: "",
    password: "",
  };
  async function submit(values) {
    try {
      clearErrors();
      await signin(values);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  }

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });
  return (
    <>
      {user ? (
        <Navigate to="/profile"></Navigate>
      ) : (
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <form
            onSubmit={handleSubmit(submit)}
            className={`${styles.form} d-flex flex-column card p-20`}
          >
            <h2 className="mb-10">Connexion</h2>
            <div className="mb-10 d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" {...register("email")} />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-10 d-flex flex-column">
              <label htmlFor="password">Password</label>
              <PasswordInput nameValue={"password"} register={register} />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            {errors.generic && (
              <div className="mb-10">
                <p className="form-error">{errors.generic.message}</p>
              </div>
            )}
            <div className={styles.infoConnexion}>
              <p>Vous n'avez pas de compte ?</p>
              <NavLink to="/signup">Inscrivez-vous juste ici</NavLink>
            </div>
            <div>
              <button disabled={isSubmitting} className="btn btn-primary">
                Connexion
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default Signin;
