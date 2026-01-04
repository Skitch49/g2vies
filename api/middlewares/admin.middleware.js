const { keyPub } = require("../keys");
const jwt = require("jsonwebtoken");

module.exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Non authentifié");

  try {
    const decoded = jwt.verify(token, keyPub);
    req.user = { id: decoded.sub };

    // Vérification de l'admin
    const isAdmin = req.user.id.toString() === process.env.ADMIN_ID;
    if (!isAdmin) return res.status(403).json("Accès refusé");

    next();
  } catch (e) {
    return res.status(401).json("Token invalide");
  }
};
