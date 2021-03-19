const Sequelize = require("sequelize");

module.exports = function (sequelize) {
const Student = sequelize.define('Student', {
    ime: {
        type: Sequelize.STRING,
    },

    index: {
        type: Sequelize.STRING,
    }

 })
 return Student;
}