const contactModel = require("../models/contact.model");
const nodemailer = require("nodemailer");

module.exports.setContact = async (req, res) => {
  try {
    const { from, to, object, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.sendMail({ from, to, subject: object, text: message });

    // save to DB
    const contact = await contactModel.create({
      from,
      to,
      object,
      message,
    });
    res.status(201).json({ message: "Message envoyé avec succès", contact });
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la creation du contact: " + error);
  }
};
