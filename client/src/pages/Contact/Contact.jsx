import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AlertContext, AuthContext } from "../../context";
import styles from "./Contact.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMessageContact } from "../../api/contact";

function Contact() {
  const { user } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Votre nom est obligatoire")
      .min(2, "Votre nom doit faire au minimum 2 caractères"),
    from: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Votre email est obligatoire"),
    object: yup
      .string()
      .required(
        "Votre objet est obligatoire il s'agit du titre de votre message",
      ),
    message: yup
      .string()
      .required("Votre message est obligatoire")
      .min(
        10,
        "Votre message est trop court il doit faire 10 caractères au minimum",
      )
      .max(
        3000,
        "Votre message est trop long il doit faire au maximum 3000 caractères",
      ),
  });
  const defaultValues = {
    name: user ? `${user?.firstname} ${user?.lastname}` : "",
    from: user ? user?.email : "",
    object: "",
    message: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  async function submit(values) {
    clearErrors();

    try {
      const to = import.meta.env.VITE_ADMIN_EMAIL;
      const newValues = { ...values, to };
      console.log(newValues);
      await createMessageContact(newValues);
      reset(defaultValues);

      addAlert({ state: "success", value: "Votre message a été envoyé !" });
    } catch (error) {
      addAlert({
        state: "danger",
        value: "Votre message ne c'est pas envoyé !",
      });

      setError("generic", { type: "generic", message: error });
    }
  }
  return (
    <div className="container d-flex flex-fill align-items-center justify-content-center">
      <div className="card">
        <div className="p-10">
          <h1 className="mb-5">Contact</h1>
          <p className="my-20">
            Une question sur un produit ? Un besoin spécifique ? N’hésitez pas à
            nous écrire, nous vous répondrons dans les plus brefs délais !
          </p>
          <form
            className="
        d-flex flex-column"
            onSubmit={handleSubmit(submit)}
          >
            <div className="d-flex flex-wrap align-items-center justify-space-between gap-10">
              <div className={`${styles.formItem} flex-fill`}>
                <label htmlFor="name">Votre nom</label>
                <input type="text" id="name" {...register("name")} />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>
              <div className={`${styles.formItem} flex-fill`}>
                <label htmlFor="from">Votre e-mail</label>
                <input type="email" id="from" {...register("from")} />
                {errors.from && (
                  <p className="form-error">{errors.from.message}</p>
                )}
              </div>
            </div>
            <div className={`${styles.formItem}`}>
              <label htmlFor="object">Objet</label>
              <input type="text" id="object" {...register("object")} />
              {errors.object && (
                <p className="form-error">{errors.object.message}</p>
              )}
            </div>
            <div className={`${styles.formItem}`}>
              <label htmlFor="message">Votre message</label>
              <textarea type="text" id="message" {...register("message")} />
              {errors.message && (
                <p className="form-error">{errors.message.message}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Envoyer
              </button>
              {errors.generic && (
                <p className="form-error">{errors.generic.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Contact;
