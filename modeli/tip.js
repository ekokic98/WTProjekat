const Sequelize = require("sequelize");

module.exports = function (sequelize) {
const Tip = sequelize.define('Tip', {
    naziv: {
        type: Sequelize.STRING,
    }
 })
 return Tip;
}