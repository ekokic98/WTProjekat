var http = require('http');
var express = require('express');
var path = require('path');
const fs  = require('fs');
const bodyParser = require('body-parser');
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const { count } = require('console');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const sequelize = require("./baza.js")

require("./ruteV1")(app); //kao da su sve funkcije ovdje
require("./crud/crudPredmet.js")(app); //ucitavanje ruta za predmet
require("./crud/crudAktivnost.js")(app); //ucitavanje ruta za aktivnost
require("./crud/crudDan.js")(app); //ucitavanje ruta za aktivnost
require("./crud/crudTip.js")(app); //ucitavanje ruta za aktivnost
require("./crud/crudGrupa.js")(app); //ucitavanje ruta za aktivnost
require("./crud/crudStudent.js")(app); //ucitavanje ruta za aktivnost

module.exports = app.listen(3000);
