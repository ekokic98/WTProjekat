const sequelize = require("../baza.js");
const Predmet = sequelize.models.Predmet;

//ZAVRŠENO

module.exports = function (app) {
    app.get('/v2/predmet', async function(req,res){ 
        const sviPredmeti = await Predmet.findAll();
        res.json(sviPredmeti);
    })
    
    app.get('/v2/predmet/:id', async function(req,res){ 
        const predmet = await Predmet.findOne({ where: { id: req.params.id } });
            if (predmet === null) {
                return res.json({ message: "Ne postoji predmet sa tim ID-jem" })
            } else {
                return res.json(predmet);
            }
    })

    app.get('/v2/predmettreci/:naziv', async function(req,res){ 
        const predmet = await Predmet.findOne({ where: { naziv: req.params.naziv } });
            if (predmet === null) {
                return res.json({ message: "Ne postoji predmet sa tim imenom" })
            } else {
                return res.json(predmet.id);
            }
    })

    app.post('/v2/predmet', async function(req, res){
        const predmet = await Predmet.findOrCreate({
            where: { naziv: req.body.naziv },
            defaults: { PredmetId: req.body.PredmetId }
          }).catch(err => {
            return res.json(err);
        });
        res.json(predmet)
    });

    app.put('/v2/predmet/:id', async function(req, res) {
        const id = req.params.id;

        return Predmet.findOne({ where: { id: id } }).then((predmet) => {
            if (predmet) {
                Predmet.findOne({where : { naziv : req.body.naziv}}).then((provjera) => {
                    if(provjera){
                        return res.json({ message: "Već postoji ovaj predmet" })
                    }
                    else{
                        predmet.update(req.body).then(p => {
                            return res.json(p);
                        })
                    }
                }).catch(err => {
                    return res.json(err);
                });
            } else {
                return res.json({ message: "Predmet nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });

    app.delete('/v2/predmet/:id', async function(req, res) {
        const id = req.params.id;

        return Predmet.findOne({ where: { id: id } }).then((predmet) => {
            if (predmet) {
                
                predmet.destroy().then(p => {
                    return res.json({ message:"Izbrisan predmet"})
                })
            } else {
                return res.json({ message: "Predmet nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });

}

  
  