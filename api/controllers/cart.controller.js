const cartModel = require("../models/cart.model");

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la récupération du panier :" + error);
  }
};

module.exports.setCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      //   Si le produit est déjà dans le panier
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      }
      //   Si pas le produit dans le panier
      else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de l'ajout au panier :" + error);
  }
};

module.exports.editCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json("Quantité invalide");
    }
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) return res.status(404).json("Panier introuvable");

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) return res.status(403).json("Produit non trouvé");

    // item = cart.items[productId]
    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        "Erreur lors de la modification de la quantite au panier :" + error
      );
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json("Panier non trouvé");
    }

    cart.items = cart.items.find(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json("Erreur lors de la suppression du produit a panier :" + error);
  }
};

module.exports.clearCart = async (req, res) => {
  try {
    userId = req.user.id;
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json("Panier introuvable");

    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json("Erreur lors de la suppression du panier :" + error);
  }
};
