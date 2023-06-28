const Pedido = require("../models/Pedido.js");

exports.crearPedido = async (req, res, next) => {
  const pedido = new Pedido(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: "Pedido agregado correctamente", status: 200 });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findById(req.params.idPedido)
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });
    if (!pedido) {
      res.json({ mensaje: "Pedido no Existe" });
      return next();
    }
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedido.findByIdAndDelete({ _id: req.params.idPedido });
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};
