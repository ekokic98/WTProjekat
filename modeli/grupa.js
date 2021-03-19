const Sequelize = require("sequelize");


module.exports = function (sequelize) {
const Grupa = sequelize.define('Grupa', {
    naziv: {
        type: Sequelize.STRING,
    }
 })
 return Grupa;
}