const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  //autorizacion por headers
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No autenticado, no hay JWT");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, "LlaveSecreta");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!revisarToken) {
    const error = new Error("No Autenticado");

    error.statusCode = 401;
    throw error;
  }
  next();
};