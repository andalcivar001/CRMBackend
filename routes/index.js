const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController.js");
const productoController = require("../controllers/productoController.js");
const pedidosController = require("../controllers/pedidoController.js");
const usuarioController = require("../controllers/usuarioController.js");

//middelware para rutas
const auth = require("../middleware/auth.js");

module.exports = function () {
  router.post("/clientes", auth, clienteController.nuevoCliente);
  router.get("/clientes", auth, clienteController.obtenerClientes);
  router.get("/clientes/:idCliente", auth, clienteController.obtenerCliente);
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  // PRODUCTOS
  router.post(
    "/productos",
    productoController.subirArchivo,
    productoController.crearProducto
  );
  router.get("/productos", auth, productoController.obtenerProductos);
  router.get(
    "/productos/:idProducto",
    auth,
    productoController.obtenerProducto
  );
  router.put(
    "/productos/:idProducto",
    productoController.subirArchivo,
    productoController.actualizarProducto
  );
  router.delete(
    "/productos/:idProducto",
    auth,
    productoController.eliminarProducto
  );
  router.get(
    "/productos/busqueda/:query",
    auth,
    productoController.buscarProducto
  );

  // PEDIDOS

  router.post("/pedidos", auth, pedidosController.crearPedido);
  router.get("/pedidos", auth, pedidosController.obtenerPedidos);
  router.get("/pedidos/:idPedido", auth, pedidosController.obtenerPedido);
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  //usuarios

  router.post("/usuarios/crear-cuenta", usuarioController.registrarUsuario);
  router.post("/usuarios/login", usuarioController.autenticarUsuario);
  router.get(
    "/usuarios/autenticar/:email/:password",
    usuarioController.autenticar
  );
  router.get(
    "/usuarios/crear-cuenta-url/:email/:nombre/:password",
    usuarioController.registrarUsuarioUrl
  );
  return router;
};
