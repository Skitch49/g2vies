const UsersSchema = require("../models/users.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../keys/index");

module.exports.createAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersSchema.findOne({ email }).exec();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });

        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        });

        res.json(user);
      } else {
        res.status(400).json("Mauvais email ou mot de passe");
      }
    } else {
      res.status(400).json("Mauvais email ou mot de passe");
    }
  } catch (e) {
    res.status(400).json("Mauvais email ou mot de passe");
  }
};

module.exports.getAuth = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub, {
        algorithms: ["RS256"],
      });
      const currentUser = await UsersSchema.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();

      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (e) {
      return res.json(null);
    }
  } else {
    return res.json(null);
  }
};

module.exports.deleteAuth = (req, res) => {
  res.clearCookie("token");
  res.end();
};
