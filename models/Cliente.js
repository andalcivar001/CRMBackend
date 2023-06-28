const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
  tipoIdent: {
    type: String,
    trim: true,
  },
  identificacion: {
    type: String,
    trim: true,
  },
  nombre: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fechaNacimiento: {
    type: Date,
  },
});

module.exports = mongoose.model("Clientes", clientesSchema);
