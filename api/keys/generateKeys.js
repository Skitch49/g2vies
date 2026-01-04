const { generateKeyPairSync } = require("crypto");
const fs = require("fs");
const path = require("path");

// Dossier où les clés seront générées
const keysDir = path.join(__dirname);
const privateKeyPath = path.join(keysDir, "jwtRS256.key");
const publicKeyPath = path.join(keysDir, "jwtRS256.key.pub");

// Génération de la paire RSA 4096 bits
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: { type: "spki", format: "pem" }, // clé publique
  privateKeyEncoding: { type: "pkcs1", format: "pem" }, // clé privée
});

// Sauvegarde des fichiers
fs.writeFileSync(privateKeyPath, privateKey);
fs.writeFileSync(publicKeyPath, publicKey);

console.log("✅ Clés RSA générées avec succès !");
console.log("Clé privée :", privateKeyPath);
console.log("Clé publique :", publicKeyPath);
