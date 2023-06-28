const Cliente = require("../models/Cliente.js");

//agrega nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Cliente(req.body);
  try {
    await cliente.save();
    res.json({ mensaje: "Se agrego un nuevo cliente", status: 200 });
  } catch (error) {
    let mensaje = "";
    if (error.code == 11000) mensaje = "Email ya existe";
    else mensaje = error;
    res.json({
      mensaje,
      status: 400,
    });
    // Si hay un error, console.log y next
    console.log("error es", mensaje);
    next();
  }
};

exports.obtenerClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.idCliente);

    if (!cliente) {
      res.json({ mensaje: "Cliente no existe" });
    } else {
      res.json(cliente);
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      { new: true } // este linea que cuando se haga el update retorne el valor nuevo
    );
    // console.log(cliente);

    res.json({ mensaje: "Se actualizo el cliente", status: 200 });
  } catch (error) {
    res.json({
      mensaje,
      status: 500,
    });
    next();
  }
};

exports.eliminarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findOneAndDelete({
      _id: req.params.idCliente,
    });
    res.json({ mensaje: "Cliente eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

/****  Todas esstas funciones son de mongoose  
findOneAndUpdate
findById
find
 
https://mongoosejs.com/docs/queries.html  .. aqui esta la documentacion de las funciones

****/
