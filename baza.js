const Sequelize = require("sequelize");
const sequelize = new Sequelize('wt2018023', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});


//import modela
const Student = require("./modeli/student.js")(sequelize)
const Tip = require("./modeli/tip.js")(sequelize)
const Dan = require("./modeli/dan.js")(sequelize)
const Aktivnost = require("./modeli/aktivnost.js")(sequelize)
const Grupa = require("./modeli/grupa.js")(sequelize)
const Predmet = require("./modeli/predmet.js")(sequelize)

//relacije

Predmet.hasMany(Grupa, {foreignKey: {allowNull: false}}); //Predmet 1-N Grupa
Grupa.belongsTo(Predmet); //Predmet 1-N Grupa

Predmet.hasMany(Aktivnost, {foreignKey: {allowNull: false}}); //Aktivnost N-1 Predmet
Aktivnost.belongsTo(Predmet); //Aktivnost N-1 Predmet

Grupa.hasMany(Aktivnost, {foreignKey: {allowNull: true}}); //Aktivnost N-0 Grupa
Aktivnost.belongsTo(Grupa); //Aktivnost N-0 Grupa

Dan.hasMany(Aktivnost, {foreignKey: {allowNull: false}}); //Aktivnost N-1 Dan
Aktivnost.belongsTo(Dan); //Aktivnost N-1 Dan

Tip.hasMany(Aktivnost, {foreignKey: {allowNull: false}}); //Aktivnost N-1 Tip
Aktivnost.belongsTo(Tip); //Aktivnost N-1 Tip

Student.belongsToMany(Grupa, { through: 'StudentGroups' }); //Student N-M Grupa
Grupa.belongsToMany(Student, { through: 'StudentGroups' }); //Student N-M Grupa


sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
    .then(function(results) {
        sequelize.sync({alter:true}).catch(err => console.log(err))
    });

module.exports=sequelize;