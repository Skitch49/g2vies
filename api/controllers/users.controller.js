const UsersSchema = require("../models/users.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.getUsers = async (req, res) => {
  try {
    const isAdmin = req.user.id.toString() === process.env.ADMIN_ID;

    if (!isAdmin) return res.status(403).json("Accès refusé");

    const users = await UsersSchema.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json("Utilisateurs introuvables !");
    }

    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json("Erreur serveur");
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.user.id !== id) return res.status(403).json("Accès refusé");

    const user = await UsersSchema.findById(id).select("-password");
    if (!user) return res.status(404).json("Utilisateur introuvable");

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json("Erreur serveur");
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      billingAddress,
      deliveryAddress,
      password,
    } = req.body;

    // Vérifie que tous les champs obligatoires sont fournis
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json("Veuillez fournir tous les champs obligatoires !");
    }

    // Vérifie que l'email n'existe pas
    const existing = await UsersSchema.findOne({ email });
    if (existing) {
      res.status(409).json("Email déjà utilisé, Veuillez vous connecter !");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new UsersSchema({
      firstname,
      lastname,
      email,
      billingAddress,
      deliveryAddress,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    console.error("Erreur dans la création de l'utilisateur ! " + e);
    res.status(500).json("Erreur dans la création de l'utilisateur ! ");
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.user.id !== id) return res.status(403).json("Accès refusé");

    const user = await UsersSchema.findById(id);
    if (!user) return res.status(404).json("Utilisateur introuvable");

    const allowedFields = [
      "firstname",
      "lastname",
      "billingAddress",
      "deliveryAddress",
    ];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] === "object" && field.endsWith("Address")) {
          updates[field] = { ...(user[field] || {}), ...req.body[field] };
        } else {
          updates[field] = req.body[field];
        }
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json("Aucun champ à modifier fourni");
    }

    const updatedUser = await UsersSchema.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (e) {
    console.error(e);
    res.status(500).json("Erreur serveur");
  }
};

module.exports.editPassword = async (req, res) => {
  try {
    const id = req.user.id; // ✅ ID du JWT
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json("Champs manquants");

    const user = await UsersSchema.findById(id);
    if (!user)
      return res.status(404).json("Utilisateur ou Mot de passe incorrect !");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(404).json("Utilisateur ou Mot de passe incorrect !");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json("Mot de passe modifié avec succès");
  } catch (e) {
    console.error(e);
    res.status(500).json("Erreur serveur");
  }
};
