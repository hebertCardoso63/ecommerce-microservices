// index.js
const express = require("express");
const load = require("express-load");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
const port = 3005;

app.use(cors({ credentials: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

load("controllers", { cwd: "app" }).then("routes").into(app);

async function inicializar() {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

inicializar();
