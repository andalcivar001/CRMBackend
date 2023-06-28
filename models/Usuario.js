const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");
const Schema = moongose.Schema;

const usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: "Agrega tu nombre",
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("usuarios", usuarioSchema);
