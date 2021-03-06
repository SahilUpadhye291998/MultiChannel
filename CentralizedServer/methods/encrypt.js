const crypto = require("crypto");
const algorythmn = "aes-192-cbc";
const password = require("../secret/secret").keySecret;
const ivSecret = require("../secret/secret").ivSecret;
const key = crypto.scryptSync(password, "salt", 24);
console.log(key);
const iv = ivSecret;

function hash(string) {
  let data = string;
  const hashed = crypto.createHash("md5").update(data).digest("hex");
  return hashed;
}

function encrypt(text) {
  console.log(text);
  const cipher = crypto.createCipher(algorythmn, password);
  let encrypt = cipher.update(text, "utf8", "hex");
  encrypt += cipher.final("hex");
  return encrypt;
}

function decrypt(text) {
  let decypher = crypto.createDecipher(algorythmn, password);
  let decrypt = decypher.update(text, "hex", "utf8");
  decrypt += decypher.final("utf8");
  return decrypt;
}

module.exports = {
  hash,
  encrypt,
  decrypt,
};
