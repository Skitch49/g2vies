const { keyPub } = require("../keys");
const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Non authentifié");

  try {
    const decoded = jwt.verify(token, keyPub);
    req.user = { id: decoded.sub }; // l'ID de l'utilisateur connecté
    next();
  } catch (e) {
    return res.status(401).json("Token invalide");
  }
};
