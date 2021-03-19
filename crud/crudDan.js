const sequelize = require("../baza.js");
const Dan = sequelize.models.Dan;

//ZAVRŠENO

module.exports = function (app) {
    app.get('/v2/dan', async function(req,res){ 
        const sviDani = await Dan.findAll();
        res.json(sviDani);
    })

    app.get('/v2/dan/:id', async function(req,res){ 
        const dan = await Dan.findOne({ where: { id: req.params.id } });
            if (dan === null) {
                return res.json({ message: "Ne postoji dan sa tim ID-jem" })
            } else {
                return res.json(dan);
            }
    })

    app.get('/v2/dantreci/:naziv', async function(req,res){ 
        const dan = await Dan.findOne({ where: { naziv: req.params.naziv } });
            if (dan === null) {
                return res.json({ message: "Ne postoji dan sa tim imenom" })
            } else {
                return res.json(dan.id);
            }
    })
    
    app.post('/v2/dan', async function(req, res){
        const dan = await Dan.findOrCreate({
            where: { naziv: req.body.naziv }
          }).catch(err => {
            return res.json(err);
        });
        res.json(dan)
    });

    app.put('/v2/dan/:id', async function(req, res) {
        const id = req.params.id;

        return Dan.findOne({ where: { id: id } }).then((dan) => {
            if (dan) {
                Dan.findOne({where : { naziv : req.body.naziv}}).then((provjera) => {
                    if(provjera){
                        return res.json({ message: "Već postoji ova dan" })
                    }
                    else{
                        dan.update(req.body).then(p => {
                            return res.json(p);
                        })
                    }
                }).catch(err => {
                    return res.json(err);
                });
            } else {
                return res.json({ message: "Dan nije nađen." })
            }
        }).catch(err => {
            return res.json(err);
        });
    });

    app.delete('/v2/dan/:id', async function(req, res) {
        const id = req.params.id;

        return Dan.findOne({ where: { id: id } }).then((dan) => {
            if (dan) {
                dan.destroy().then(p => {
                    return res.json({ message:"Izbrisan dan"})
                })
            } else {
                return res.json({ message: "Dan nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });

    
}