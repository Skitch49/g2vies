const ProductModel = require("../models/products.model");

module.exports.getProducts = async (req, res) => {
  try {
    // skip et limit facultatifs
    const skip = req.query.skip ? parseInt(req.query.skip) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    // tri par createdAt (asc ou desc)
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const products = await ProductModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortOrder });

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json("Erreur dans l'affichage des produits : " + e);
  }
};

module.exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (e) {
    res
      .status(500)
      .json(
        "Erreur dans l'affichage du produit id : " + id + " | Erreur: " + e
      );
  }
};

module.exports.setProduct = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json("Merci d'ajouter un produit !");
    }
    const { name, price, originalPrice, quantity, category, brand, condition } =
      req.body;

    if (
      !name ||
      !price ||
      !originalPrice ||
      !quantity ||
      !category ||
      !brand ||
      !condition
    ) {
      return res.status(400).json({
        message: "Champs obligatoires manquants !",
      });
    }
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).json("Erreur dans l'ajout du produit : " + e);
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res
        .status(400)
        .json("Erreur dans la récupération du produit: " + product);
    } else {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(201).json(updatedProduct);
    }
  } catch (e) {
    res.status(500).json("Erreur dans la modification du produit : " + e);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(400).json("Ce produit n'existe pas !");
    }
    res.status(200).json("Le produit a été supprimé à l'id : " + req.params.id);
  } catch (e) {
    res.status(500).json("Erreur dans la suppression du produit : " + e);
  }
};
