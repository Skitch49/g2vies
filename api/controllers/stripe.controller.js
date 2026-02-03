require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const Cart = require("../models/cart.model");
const Product = require("../models/products.model");
const Order = require("../models/order.model");

module.exports.createCheckoutSession = async (req, res) => {
  try {
    const { cart, user } = req.body;

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: "Le panier est vide" });
    }

    const line_items = cart.items.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.product.name,
            images: [item.product.images[0].url],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: user.email,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE"],
      },
      metadata: {
        userId: user._id,
        cartId: cart._id,
      },
      client_reference_id: user._id,
      success_url: `${process.env.CLIENT_URL}/stripe/success`,
      cancel_url: `${process.env.CLIENT_URL}/stripe/cancel`,
    });
    console.log(cart._id, user._id);
    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.stripeWebhook = async (req, res) => {
  console.log("🔥 Webhook reçu !");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    console.log("✅ Signature vérifiée !");
  } catch (err) {
    console.log("❌ Webhook Stripe invalide:", err.message);
    return res.status(400).send("Webhook Error");
  }

  // 🎯 Paiement validé
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("💰 Session checkout :", session);

    const userId = session.metadata?.userId;
    const cartId = session.metadata?.cartId;
    console.log("📦 Metadata reçue - userId:", userId, "cartId:", cartId);

    if (!cartId || !userId) {
      console.log("❌ Metadata manquante");
      return res
        .status(400)
        .json({ received: false, message: "Metadata manquante" });
    }

    let cart;
    try {
      cart = await Cart.findById(mongoose.Types.ObjectId(cartId)).populate(
        "items.product",
      );
      console.log("📄 Cart trouvé :", cart);
    } catch (err) {
      console.log("❌ Erreur récupération panier :", err);
      return res.status(500).json({ received: false });
    }

    if (!cart || cart.items.length === 0) {
      console.log("⚠️ Panier vide ou inexistant");
      return res.json({ received: true });
    }

    // ❌ éviter doublon commande
    const existing = await Order.findOne({ stripeSessionId: session.id });
    console.log("📌 Commande existante :", existing);

    if (existing) {
      console.log("⚠️ Commande déjà créée, on ignore");
      return res.json({ received: true });
    }

    // ✅ créer commande
    const order = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice: session.amount_total / 100,
      stripeSessionId: session.id,
    });
    console.log("✅ Commande créée :", order._id);

    // ✅ réduire stock produit
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { quantity: -item.quantity },
      });
      console.log(
        `📉 Stock réduit pour ${item.product.name} -${item.quantity}`,
      );
    }

    // ✅ vider panier
    cart.items = [];
    await cart.save();
    console.log("🗑️ Panier vidé pour l'utilisateur :", userId);
  }

  res.json({ received: true });
};
