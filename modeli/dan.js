const Sequelize = require("sequelize");


module.exports = function (sequelize) {
const Dan = sequelize.define('Dan', {
    naziv: {
        type: Sequelize.STRING,
    }
 })
 return Dan;
}