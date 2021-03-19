const Sequelize = require("sequelize");

module.exports = function (sequelize) {
const Predmet = sequelize.define('Predmet', {
    naziv: {
        type: Sequelize.STRING,
    }
 })
 return Predmet;
}