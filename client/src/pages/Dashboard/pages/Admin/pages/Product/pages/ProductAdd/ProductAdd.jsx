import { useFieldArray, useForm } from "react-hook-form";
import styles from "./ProductAdd.module.scss";
import ToggleInput from "../../../../../../../../components/ToggleInput/ToggleInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProduct } from "../../../../../../../../api";
import { useContext } from "react";
import { AlertContext } from "../../../../../../../../context";

function ProductAdd() {
  const { addAlert } = useContext(AlertContext);

  const initialSchema = yup.object({
    name: yup
      .string()
      .required("Le nom du produit est obligatoire.")
      .min(3, "Le nom du produit doit contenir au moins 3 caractères.")
      .max(100, "Le nom du produit ne peut pas dépasser 100 caractères."),

    description: yup.string().nullable(),

    originalPrice: yup
      .number()
      .typeError("Le prix neuf doit être un nombre.")
      .required("Le prix neuf est obligatoire.")
      .min(0, "Le prix neuf ne peut pas être négatif."),

    price: yup
      .number()
      .typeError("Le prix de vente doit être un nombre.")
      .required("Le prix de vente est obligatoire.")
      .min(0, "Le prix de vente ne peut pas être négatif.")
      .test(
        "price-comparison",
        "Le prix de vente doit être inférieur ou égal au prix neuf.",
        function (value) {
          const { originalPrice } = this.parent;

          if (value == null || originalPrice == null) return true;

          return Number(originalPrice) >= Number(value);
        }
      ),

    quantity: yup
      .number()
      .typeError("La quantité doit être un nombre.")
      .required("La quantité est obligatoire.")
      .integer("La quantité doit être un nombre entier.")
      .min(0, "La quantité ne peut pas être négative."),

    category: yup.string().required("La catégorie est obligatoire."),

    customCategory: yup.string().when("category", {
      is: "other",
      then: (schema) =>
        schema.required("Veuillez renseigner la nouvelle catégorie."),
      otherwise: (schema) => schema.notRequired(),
    }),

    brand: yup.string().required("La marque est obligatoire."),

    customBrand: yup.string().when("brand", {
      is: "other",
      then: (schema) =>
        schema.required("Veuillez renseigner la nouvelle marque."),
      otherwise: (schema) => schema.notRequired(),
    }),

    condition: yup
      .string()
      .required("L’état du produit est obligatoire.")
      .oneOf(
        [
          "Neuf",
          "Comme neuf",
          "Très bon état",
          "Bon état",
          "Usagé",
          "Reconditionné",
        ],
        "Condition invalide."
      ),

    images: yup
      .array()
      .min(1, "Au moins une image est obligatoire")
      .of(
        yup.object({
          url: yup.string().url("URL invalide").required("Image obligatoire"),
        })
      ),

    model: yup.string().nullable(),

    cpu: yup.string().nullable(),

    gpu: yup.string().nullable(),

    ram: yup
      .number()
      .typeError("La RAM doit être un nombre.")
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable()
      .min(1, "La RAM doit être supérieure à 0."),

    color: yup.string().nullable(),
    weight: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable()
      .typeError("Le poids doit être un nombre.")
      .min(0, "Le poids ne peut pas être négatif."),

    storage: yup.object({
      capacity: yup
        .number()
        .typeError("La capacité de stockage doit être un nombre.")
        .nullable()
        .min(1, "La capacité de stockage doit être supérieure à 0."),

      unit: yup
        .string()
        .oneOf(["Go", "To"], "Unité de stockage invalide.")
        .required("L’unité de stockage est obligatoire."),

      type: yup
        .string()
        .oneOf(["SSD", "HDD"], "Type de stockage invalide.")
        .required("Le type de stockage est obligatoire."),
    }),

    screenSize: yup
      .number()
      .typeError("La taille d’écran doit être un nombre.")
      .nullable()
      .min(5, "La taille d’écran semble trop petite.")
      .max(30, "La taille d’écran semble trop grande."),

    operatingSystem: yup.string().nullable(),

    wifi: yup.boolean(),
    bluetooth: yup.boolean(),
    webcam: yup.boolean(),
    numpad: yup.boolean(),
    microphone: yup.boolean(),

    connectors: yup.array().of(
      yup.object({
        name: yup.string().required("Le nom du connecteur est obligatoire."),
        quantity: yup
          .number()
          .typeError("La quantité doit être un nombre.")
          .required("La quantité est obligatoire.")
          .integer("La quantité doit être un nombre entier.")
          .min(1, "La quantité doit être au minimum 1."),
      })
    ),
  });

  const defaultValues = {
    name: "",
    description: "",
    price: null,
    originalPrice: null,
    quantity: 1,

    category: "pc portable",
    customCategory: "",
    brand: "",
    customBrand: "",

    condition: "Très bon état",

    images: [{ url: "" }],
    connectors: [{ name: "", quantity: 1 }],

    model: "",
    cpu: "",
    gpu: "",
    ram: null,
    color: "",
    weight: null,

    storage: {
      capacity: null,
      unit: "Go",
      type: "SSD",
    },

    screenSize: null,
    operatingSystem: "Windows 11",

    wifi: false,
    bluetooth: false,
    webcam: false,
    numpad: false,
    microphone: false,
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(initialSchema),
  });
  const images = useFieldArray({ control, name: "images" });
  const connectors = useFieldArray({ control, name: "connectors" });
  const selectedCategory = watch("category");
  const selectedBrand = watch("brand");

  function addImage() {
    images.append({
      url: "",
    });
  }

  function addConnector() {
    connectors.append({
      quantity: "1",
      name: "",
    });
  }

  function deleteField(field, index) {
    field.remove(index);
  }

  async function submit(values) {
    clearErrors();
    console.log(values);
    try {
      await createProduct(values);
      addAlert({ state: "success", value: "Produit ajouté avec succès !" });
      reset(defaultValues);
      // reset useFieldArray
      images.replace([{ url: "" }]);
      connectors.replace([{ name: "", quantity: 1 }]);
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Une erreur est survenue";
      addAlert({ state: "danger", value: errorMessage });

      setError("generic", { type: "generic", message: errorMessage });
    }
  }

  return (
    <div className="card">
      <h3>Ajouter un produit</h3>
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="name">Nom</label>
          <input {...register("name")} type="text" id="name" />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="description">description</label>
          <textarea {...register("description")} id="description" />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>
        <div className="d-flex flex-row align-items-center justify-space-between mb-5 gap-15">
          <div className="d-flex flex-column mb-5">
            <label htmlFor="originalPrice">Prix neuf</label>
            <input
              {...register("originalPrice")}
              type="number"
              id="originalPrice"
            />
            {errors.originalPrice && (
              <p className="form-error">{errors.originalPrice.message}</p>
            )}
          </div>
          <div className="d-flex flex-column mb-5">
            <label htmlFor="price">Prix de vente</label>
            <input {...register("price")} type="number" id="price" />
            {errors.price && (
              <p className="form-error">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="quantity">Quantité</label>
          <input {...register("quantity")} type="number" id="quantity" />
          {errors.quantity && (
            <p className="form-error">{errors.quantity.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="category">Catégorie</label>
          <select {...register("category")} id="category">
            <option value="pc portable">PC Portable</option>
            <option value="pc fixe">PC Fixe</option>
            <option value="other">Autre</option>
          </select>
          {errors.category && (
            <p className="form-error">{errors.category.message}</p>
          )}
          {selectedCategory === "other" && (
            <div className="d-flex flex-column mt-5">
              <label htmlFor="customCategory">Nouvelle catégorie</label>
              <input
                {...register("customCategory")}
                type="text"
                id="customCategory"
                placeholder="Veuillez renseigné la nouvelle catégorie"
              />
              {errors.customCategory && (
                <p className="form-error">{errors.customCategory.message}</p>
              )}
            </div>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="brand">Marque</label>
          <select {...register("brand")} id="brand">
            <option value="pc portable">Lidle</option>
            <option value="pc fixe">Lenovo</option>
            <option value="other">Autre</option>
          </select>
          {errors.brand && <p className="form-error">{errors.brand.message}</p>}
          {selectedBrand === "other" && (
            <div className="d-flex flex-column mt-5">
              <label htmlFor="">Nouvelle Marque</label>
              <input
                {...register("customBrand")}
                type="text"
                id=""
                placeholder="Veuillez renseigné la nouvelle marque"
              />
              {errors.customBrand && (
                <p className="form-error">{errors.customBrand.message}</p>
              )}
            </div>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="model">modèle</label>
          <input {...register("model")} type="text" id="model" />
          {errors.model && <p className="form-error">{errors.model.message}</p>}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="condition">Condition</label>
          <select {...register("condition")} id="condition">
            <option value="Neuf">Neuf</option>
            <option value="Comme neuf">Comme neuf</option>
            <option value="Très bon état">Très bon état</option>
            <option value="Bon état">Bon état</option>
            <option value="Usagé">Usagé</option>
            <option value="Reconditionné">Reconditionné</option>
          </select>
          {errors.condition && (
            <p className="form-error">{errors.condition.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          {images.fields.map((image, index) => (
            <div className="d-flex flex-column mb-5" key={image.id}>
              <label htmlFor={`image-${index}`}>Image {index + 1}</label>
              <div className="d-flex flex-fill flex-row">
                <input
                  {...register(`images.${index}.url`)}
                  type="url"
                  id={`image-${index}`}
                  className={`${
                    index > 0 ? styles.rightInputWithDeleteBtn : ""
                  } d-flex flex-fill`}
                />
                {errors.images?.[index]?.url && (
                  <p className="form-error">
                    {errors.images[index].url.message}
                  </p>
                )}
                {index > 0 && (
                  <button
                    type="button"
                    className={`${styles.rightBtnDelete} btn btn-warning`}
                    onClick={() => deleteField(images, index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addImage()}
          >
            Ajouter une image
          </button>
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="cpu">Processeur</label>
          <input {...register("cpu")} type="text" id="cpu" />
          {errors.cpu && <p className="form-error">{errors.cpu.message}</p>}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="gpu">Carte graphique</label>
          <input {...register("gpu")} type="text" id="gpu" />
          {errors.gpu && <p className="form-error">{errors.gpu.message}</p>}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="ram">RAM</label>
          <input {...register("ram")} type="number" id="ram" />
          {errors.ram && <p className="form-error">{errors.ram.message}</p>}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="color">Couleur</label>
          <input {...register("color")} type="text" id="color" />
          {errors.color && <p className="form-error">{errors.color.message}</p>}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="weight">Poids</label>
          <input
            {...register("weight")}
            type="number"
            id="weight"
            placeholder="En gramme"
          />
          {errors.weight && (
            <p className="form-error">{errors.weight.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="storage.capacity">Stockage</label>
          <input
            {...register("storage.capacity")}
            type="number"
            id="storage.capacity"
          />
          {errors.storage?.capacity?.message && (
            <p className="form-error">{errors.storage.capacity.message}</p>
          )}
        </div>
        <div className="d-flex align-items-center justify-space-around">
          <div className="d-flex flex-column mb-5">
            <h4>Unité</h4>
            <div className="d-flex justify-space-between gap-15">
              <div className="d-flex flex-row justify-space-between gap-15">
                <label
                  htmlFor="storage.unit1"
                  className={styles.labelRadioButton}
                >
                  Go
                </label>
                <input
                  {...register("storage.unit")}
                  type="radio"
                  value="Go"
                  id="storage.unit1"
                />
              </div>
              <div className="d-flex flex-row justify-space-between gap-15">
                <label
                  htmlFor="storage.unit2"
                  className={styles.labelRadioButton}
                >
                  To
                </label>
                <input
                  {...register("storage.unit")}
                  type="radio"
                  value="To"
                  id="storage.unit2"
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <h4>Type de stockage</h4>
            <div className="d-flex justify-space-between mb-5">
              <div className="d-flex flex-row justify-space-between gap-15">
                <label
                  htmlFor="storage.type1"
                  className={styles.labelRadioButton}
                >
                  HDD
                </label>
                <input
                  {...register("storage.type")}
                  type="radio"
                  value="HDD"
                  id="storage.type1"
                />
              </div>
              <div className="d-flex flex-row justify-space-between gap-15">
                <label
                  htmlFor="storage.type2"
                  className={styles.labelRadioButton}
                >
                  SSD
                </label>
                <input
                  {...register("storage.type")}
                  type="radio"
                  value="SSD"
                  id="storage.type2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="operatingSystem">Système d'exploitation</label>
          <input
            {...register("operatingSystem")}
            type="text"
            id="operatingSystem"
          />
          {errors.operatingSystem && (
            <p className="form-error">{errors.operatingSystem.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          <label htmlFor="screenSize">Taille d'écran</label>
          <input
            {...register("screenSize")}
            type="number"
            id="screenSize"
            placeholder="en pouce"
          />
        </div>
        <div className="d-flex justify-space-around wrap flex-row-reverse">
          <div
            className={`d-flex  wrap ${
              selectedCategory == "pc portable"
                ? "flex-column"
                : "flex-row d-flex align-items-center justify-space-around flex-fill"
            }  `}
          >
            <ToggleInput label="Wifi" name="wifi" register={register} />
            <ToggleInput
              label="bluetooth"
              name="bluetooth"
              register={register}
            />
          </div>

          {selectedCategory == "pc portable" && (
            <div className="">
              <ToggleInput label="Numpad" name="numpad" register={register} />
              <ToggleInput label="Webcam" name="webcam" register={register} />
              <ToggleInput
                label="Microphone"
                name="microphone"
                register={register}
              />
            </div>
          )}
        </div>
        <div className="d-flex flex-column mb-5">
          {connectors.fields.map((connector, index) => (
            <div className="d-flex flex-column mb-5 " key={connector.id}>
              <div className="d-flex flex-fill justify-space-between mb-5">
                <div className="d-flex flex-column ">
                  <label htmlFor={`connector-${index}`}>
                    Nom du connecteur {index + 1}
                  </label>
                  <input
                    {...register(`connectors.${index}.name`)}
                    type="text"
                    id={`connector-${index}`}
                    className="d-flex flex-fill"
                  />
                  {errors.connectors?.[index]?.name?.message && (
                    <p className="form-error">
                      {errors.connectors[index].name.message}
                    </p>
                  )}
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor={`connector-${index}-quantity`}>
                    Quantité
                  </label>
                  <input
                    {...register(`connectors.${index}.quantity`)}
                    type="number"
                    id={`connector-${index}-quantity`}
                    className="d-flex flex-fill"
                  />
                  {errors.connectors?.[index]?.quantity?.message && (
                    <p className="form-error">
                      {errors.connectors[index].quantity.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-warning"
                onClick={() => deleteField(connectors, index)}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addConnector(connectors)}
          >
            Ajouter un connecteur
          </button>
        </div>
        <div>
          {errors.generic && (
            <p className="form-error">{errors.generic.message}</p>
          )}

          <button className="btn btn-primary" disabled={isSubmitting}>
            Ajouter un produit
          </button>
        </div>
      </form>
    </div>
  );
}
export default ProductAdd;
