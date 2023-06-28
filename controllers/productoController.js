const Producto = require("../models/Producto.js");
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no válido"));
    }
  },
};

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single("imagen");

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.crearProducto = async (req, res, next) => {
  const producto = new Producto(req.body);
  try {
    if (req.file) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se agrego un nuevo producto", status: 200 });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.idProducto);
    res.json(producto);
    if (!producto) {
      res.json({ mensaje: "producto no existe" });
    } else {
      res.json(producto);
      res.end();
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarProducto = async (req, res, next) => {
  try {
    // construimos nuevo producto
    let nuevoProducto = req.body;

    //verificar si la imagen es nueva
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      const productoAnterior = await Producto.findById(req.params.idProducto);
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    const producto = await Producto.findOneAndUpdate(
      {
        _id: req.params.idProducto,
      },
      nuevoProducto,
      {
        new: true,
      }
    );

    res.json(producto);
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

// Elimina un producto via ID
exports.eliminarProducto = async (req, res, next) => {
  const { idProducto } = req.params;
  try {
    // buscar la ruta de la imagen a eliminar
    const producto = await Producto.findById({ _id: idProducto });
    console.log(producto.imagen);
    // if existe la imagen la eliminamos
    if (producto.imagen) {
      fs.unlink(__dirname + "../../uploads/" + producto.imagen, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    }

    await Producto.findByIdAndDelete({ _id: idProducto });

    res.json({ mensaje: "El producto se ha eliminado", status: 200 });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarProducto = async (req, res, next) => {
  console.log(req);
  try {
    const { query } = req.params;
    const producto = await Producto.find({ nombre: new RegExp(query, "i") });
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};
