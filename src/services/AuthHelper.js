import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

const privateKey = fs.readFileSync("jwtRS256.key");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  if (!req.body.password) next();
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
    delete req.user.password;
    const payload = {
      sub: req.user,
    };
    const token = jwt.sign(payload, privateKey, {
      // expiresIn: "1h",
      algorithm: "RS256",
    });
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Error");
  }
};

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized access");
  }

  try {
    const decoded = jwt.verify(token, privateKey);
    req.payload = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

function checkSameParamsIdAsToken(req, res, next) {
  if (!req.payload) {
    console.error(
      "Make sure to use checkSameParamsIdAsToken after verifyToken in routes"
    );
    return res.status(401).send("Invalid token");
  }
  console.log(req.payload);
  if (req.payload.sub.id === parseInt(req.params.id)) next();
  else res.sendStatus(403);
}

export default {
  hashPassword,
  verifyPassword,
  verifyToken,
  checkSameParamsIdAsToken,
};
