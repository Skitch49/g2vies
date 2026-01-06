import { useForm } from "react-hook-form";
import PasswordInput from "../../../../../../components/PasswordInput/PasswordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPassword } from "../../../../../../api/users";
import { useContext } from "react";
import { AuthContext, AlertContext } from "../../../../../../context";

function ProfilePasswordEdit() {
  const { user } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required("Votre mot de passe est obligatoire !")
      .min(6, "Votre mot de passe doit avoir 6 caratères minimum !")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial !"
      ),
    newPassword: yup
      .string()
      .required("Votre nouveau mot de passe est obligatoire !")
      .min(6, "Votre nouveau mot de passe doit avoir 6 caratères minimum !")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial !"
      )
      .notOneOf(
        [yup.ref("currentPassword"), ""],
        "Aucun changement de mot de passe !"
      ),
    confirmNewPassword: yup
      .string()
      .required("Votre nouveau mot de passe est obligatoire !")
      .min(6, "Votre nouveau mot de passe doit avoir 6 caratères minimum !")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial !"
      )
      .oneOf(
        [yup.ref("newPassword"), ""],
        "Les mots de passe ne correspondent pas"
      )
      .notOneOf(
        [yup.ref("currentPassword"), ""],
        "Aucun changement de mot de passe !"
      ),
  });
  const {
    handleSubmit,
    register,
    clearErrors,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  async function submit(values) {
    clearErrors();
    try {
      const { confirmNewPassword: _confirmNewPassword, ...cleanPassword } =
        values;
      await editPassword(cleanPassword, user._id);
      reset();
      addAlert({
        state: "success",
        value: "Mot de passe modifié avec succes !",
      });
    } catch (message) {
      setError("generic", { type: "generic", message });
      addAlert({
        state: "danger",
        value: message,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="card">
      <h2>Modifier mon mot de passe</h2>
      <section>
        <label htmlFor="currentPassword">Mot de passe actuel</label>
        <PasswordInput nameValue={"currentPassword"} register={register} />
        {errors.currentPassword && (
          <p className="form-error">{errors.currentPassword.message}</p>
        )}
      </section>
      <section>
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <PasswordInput nameValue={"newPassword"} register={register} />
        {errors.newPassword && (
          <p className="form-error">{errors.newPassword.message}</p>
        )}
      </section>
      <section>
        <label htmlFor="confirmNewPassword">Confirmation de mot de passe</label>
        <PasswordInput nameValue={"confirmNewPassword"} register={register} />
        {errors.confirmNewPassword && (
          <p className="form-error">{errors.confirmNewPassword.message}</p>
        )}
      </section>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Modifier
        </button>
      </div>
    </form>
  );
}
export default ProfilePasswordEdit;
