const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conectado a BD de mongodb"))
  .catch((e) => console.log("error de conexión", e));

//crear servidor
const app = express();

app.use(express.static("uploads"));

// Habilitar Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// definir dominio que acepte peiticiones
const urlPermitidas = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    //   origin = "https://crm-react-001.netlify.app";

    if (!origin || urlPermitidas.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Rutas de la App
app.use("/", routes());

//carpeta publica

const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";
// Puerto
app.listen(port, host, () => {
  console.log("el servidor esta funcionando");
});

console.log("ya paso el listen");
