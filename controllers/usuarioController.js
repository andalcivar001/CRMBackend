const Usuario = require("../models/Usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    // para validar si el usuario existe, ver en el console log que codigo devuelve y  validarlo uno mismo

    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    await res.status(401).json({ mensaje: "Usuario no existe" });
    next(); // para que se detenga, es como un return
  } else {
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(401).json({ mensaje: "Password incorrecto" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "LlaveSecreta",
        {
          expiresIn: "4h",
        }
      );
      console.log(token);
      res.json({ token });
    }
  }
};
