import { useContext } from "react";
import { AuthContext } from "../../../../context";
import { useForm } from "react-hook-form";
import { countries } from "../../../../constants/countries";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUser } from "../../../../api";
import styles from "./ProfileEdit.module.scss";

function ProfileEdit() {
  const { user } = useContext(AuthContext);

  const addressSchema = yup
    .object({
      country: yup
        .string()
        .transform((value) => (value === "" ? null : value))
        .nullable(),
      street: yup
        .string()
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .min(2)
        .max(100),
      building: yup
        .string()
        .transform((value) => (value === "" ? null : value))
        .nullable(),
      postalCode: yup
        .string()
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .matches(/^\d{5}$/, {
          message: "Le code postal doit contenir exactement 5 chiffres",
          excludeEmptyString: true,
        }),
      city: yup
        .string()
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .min(2)
        .max(60),
      phone: yup
        .string()
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .transform((v) => v?.replace(/\s/g, ""))
        .matches(/^0\d{9}$/, {
          message: "Le numéro doit commencer par 0 et contenir 10 chiffres",
          excludeEmptyString: true,
        }),
    })
    .test(
      "address-required-if-filled",
      "Tous les champs obligatoires de l'adresse doivent être remplis",
      (value) => {
        if (!value) return true;

        const filled = Object.values(value).some((v) => v !== null && v !== "");

        if (!filled) return true;

        return (
          !!value.country &&
          !!value.street &&
          !!value.postalCode &&
          !!value.city
        );
      }
    );

  const validationSchema = yup.object({
    firstname: yup.string().required().min(2).max(60),
    lastname: yup.string().required().min(2).max(60),
    billingAddress: addressSchema,
    deliveryAddress: addressSchema,
  });

  const defaultValues = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    billingAddress: {
      country: user.billingAddress?.country ?? null,
      street: user.billingAddress?.street ?? null,
      building: user.billingAddress?.building ?? null,
      postalCode: user.billingAddress?.postalCode ?? null,
      city: user.billingAddress?.city ?? null,
      phone: user.billingAddress?.phone ?? null,
    },
    deliveryAddress: {
      country: user.deliveryAddress?.country ?? null,
      street: user.deliveryAddress?.street ?? null,
      building: user.deliveryAddress?.building ?? null,
      postalCode: user.deliveryAddress?.postalCode ?? null,
      city: user.deliveryAddress?.city ?? null,
      phone: user.deliveryAddress?.phone ?? null,
    },
  };

  function cleanEmptyAddresses(values) {
    const newValues = { ...values };

    ["billingAddress", "deliveryAddress"].forEach((key) => {
      if (
        newValues[key] &&
        Object.values(newValues[key]).every(
          (val) => val === null || val === "" || val === undefined
        )
      ) {
        delete newValues[key]; // supprime l'adresse si tout est vide
      }
    });

    return newValues;
  }

  function formatPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length > 0 && digits[0] !== "0") {
      return "0";
    }

    return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }

  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  async function submit(values) {
    clearErrors();

    // enleve l'email des champs a modifier
    const { email: _email, ...rest } = values;
    const newValues = cleanEmptyAddresses(rest);

    if (!isDirty || newValues == user) {
      setError("generic", {
        type: "generic",
        message: "Aucune modification effectué !",
      });
      return;
    }
    try {
      const userId = user._id;

      await editUser(newValues, userId);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={`${styles.form} card`}>
      <h2>Modifier mon profil</h2>
      <div className={styles.containerInput}>
        <label htmlFor="firstname">Prénom</label>
        <input {...register("firstname")} type="text" id="firstname" />
        {errors.firstname && (
          <p className="form-error">{errors.firstname.message}</p>
        )}
      </div>
      <div className={styles.containerInput}>
        <label htmlFor="lastname">Nom</label>
        <input {...register("lastname")} type="text" id="lastname" />
        {errors.lastname && (
          <p className="form-error">{errors.firstname.message}</p>
        )}
      </div>
      <div className={styles.containerInput}>
        <label htmlFor="email">Email</label>
        <input type="readonly" id="email" value={user.email} readOnly />
        {errors.lastname && (
          <p className="form-error">{errors.firstname.message}</p>
        )}
      </div>
      <div className="container-part-form">
        <h3>Adresse de facturation</h3>
        {errors.billingAddress?.message && (
          <p className="form-error">{errors.billingAddress.message}</p>
        )}
        <div className={styles.containerInput}>
          <label htmlFor="country">Pays</label>
          <select
            {...register("billingAddress.country")}
            type="text"
            id="country"
          >
            <option value="">Sélectionner un pays</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
            ,
          </select>
          {errors.billingAddress?.country && (
            <p className="form-error">
              {errors.billingAddress.country.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="street">Rue</label>
          <input
            {...register("billingAddress.street")}
            type="text"
            id="street"
          />
          {errors.billingAddress?.street && (
            <p className="form-error">{errors.billingAddress.street.message}</p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="building">Batiment (optionnel)</label>
          <input
            {...register("billingAddress.building")}
            type="text"
            id="building"
          />
          {errors.billingAddress?.building && (
            <p className="form-error">
              {errors.billingAddress.building.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="postalCode">Code postal</label>
          <input
            {...register("billingAddress.postalCode")}
            type="text"
            id="postalCode"
          />
          {errors.billingAddress?.postalCode && (
            <p className="form-error">
              {errors.billingAddress.postalCode.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="city">Ville</label>
          <input {...register("billingAddress.city")} type="text" id="city" />
          {errors.billingAddress?.city && (
            <p className="form-error">{errors.billingAddress.city.message}</p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="phone">Téléphone</label>
          <input
            {...register("billingAddress.phone")}
            type="tel"
            id="phone"
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setValue("billingAddress.phone", formatted);
            }}
          />
          {errors.billingAddress?.phone && (
            <p className="form-error">{errors.billingAddress.phone.message}</p>
          )}
        </div>
      </div>
      <div className="container-part-form">
        <h3>Adresse de livraison</h3>
        {errors.deliveryAddress?.message && (
          <p className="form-error">{errors.deliveryAddress.message}</p>
        )}
        <div className={styles.containerInput}>
          <label htmlFor="deliveryAddressCountry">Pays</label>
          <select
            {...register("deliveryAddress.country")}
            type="text"
            id="deliveryAddressCountry"
          >
            <option value="">Sélectionner un pays</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
            ,
          </select>
          {errors.deliveryAddress?.country && (
            <p className="form-error">
              {errors.deliveryAddress.country.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="deliveryAddressStreet">Rue</label>
          <input
            {...register("deliveryAddress.street")}
            type="text"
            id="deliveryAddressStreet"
          />
          {errors.deliveryAddress?.street && (
            <p className="form-error">
              {errors.deliveryAddress.street.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="deliveryAddressBuilding">Batiment (optionnel)</label>
          <input
            {...register("deliveryAddress.building")}
            type="text"
            id="deliveryAddressBuilding"
          />
          {errors.deliveryAddress?.building && (
            <p className="form-error">
              {errors.deliveryAddress.building.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="deliveryAddressPostalCode">Code postal</label>
          <input
            {...register("deliveryAddress.postalCode")}
            type="text"
            id="deliveryAddressPostalCode"
          />
          {errors.deliveryAddress?.postalCode && (
            <p className="form-error">
              {errors.deliveryAddress.postalCode.message}
            </p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="deliveryAddressCity">Ville</label>
          <input
            {...register("deliveryAddress.city")}
            type="text"
            id="deliveryAddressCity"
          />
          {errors.deliveryAddress?.city && (
            <p className="form-error">{errors.deliveryAddress.city.message}</p>
          )}
        </div>
        <div className={styles.containerInput}>
          <label htmlFor="deliveryAddressPhone">Téléphone</label>
          <input
            {...register("deliveryAddress.phone")}
            type="tel"
            id="deliveryAddressPhone"
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setValue("deliveryAddress.phone", formatted);
            }}
          />
          {errors.deliveryAddress?.phone && (
            <p className="form-error">{errors.deliveryAddress.phone.message}</p>
          )}
        </div>
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}

      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Modifier
        </button>
      </div>
    </form>
  );
}
export default ProfileEdit;
