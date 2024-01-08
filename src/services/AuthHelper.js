import argon2 from "argon2";
import jwt from "jsonwebtoken";
import * as fs from "fs";

const privateKey = fs.readFileSync("jwtRS256.key");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  if (typeof req.body.password !== "string") return next();
  try {
    req.body.password = await argon2.hash(req.body.password, hashingOptions);
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const isVerified = await argon2.verify(
      req.user.password,
      req.body.password,
      hashingOptions
    );
    if (!isVerified) res.status(401).send("Unauthorized");
    const userWithoutPassword = { ...req.user };
    delete userWithoutPassword.password;
    const payload = {
      sub: userWithoutPassword,
    };
    const token = jwt.sign(payload, privateKey, {
      // expiresIn: "1h",
      algorithm: "RS256",
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Error");
  }
};

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  console.log("Token:", token);
  if (!token) {
    return res.status(401).send("Accès refusé");
  }

  try {
    const decoded = jwt.verify(token, privateKey);
    console.log("Decoded:", decoded);
    req.payload = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Token non valide");
  }
}

function checkSameParamsIdAsToken(req, res, next) {
  if (!req.payload) {
    console.error(
      "Make sure to use checkSameParamsIdAsToken after verifyToken in routes"
    );
    return res.status(401).send("Invalid token");
  }
  req.payload.user_id = parseInt(req.payload.user_id);
  if (req.payload.user_id === parseInt(req.params.id)) next();
  else res.sendStatus(403);
}

export default {
  hashPassword,
  verifyPassword,
  verifyToken,
  checkSameParamsIdAsToken,
};
