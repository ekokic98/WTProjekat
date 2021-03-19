const sequelize = require("../baza.js");
const Tip = sequelize.models.Tip;

//ZAVRŠENO

module.exports = function (app) {
    app.get('/v2/tip', async function(req,res){ 
        const sviTipovi = await Tip.findAll(); //await može samo unutar async funkcije, zablokira izvišavanje funkcije
        res.json(sviTipovi);
    })

    app.get('/v2/tip/:id', async function(req,res){ 
        const tip = await Tip.findOne({ where: { id: req.params.id } });
            if (tip === null) {
                return res.json({ message: "Ne postoji tip sa tim ID-jem" })
            } else {
                return res.json(tip);
            }
    })
    

    app.get('/v2/tiptreci/:naziv', async function(req,res){ 
        const tip = await Tip.findOne({ where: { naziv: req.params.naziv } });
            if (tip === null) {
                return res.json({ message: "Ne postoji tip sa tim imenom" })
            } else {
                return res.json(tip.id);
            }
    })   

    app.post('/v2/tip', async function(req, res){
        const tip = await Tip.findOrCreate({
            where: { naziv: req.body.naziv }
          }).catch(err => {
            return res.json(err);
        });
        res.json(tip)
    });

    app.put('/v2/tip/:id', async function(req, res) {
        const id = req.params.id;

        return Tip.findOne({ where: { id: id } }).then((tip) => {
            if (tip) {
                Tip.findOne({where : { naziv : req.body.naziv}}).then((provjera) => {
                    if(provjera){
                        return res.json({ message: "Već postoji ovaj tip" })
                    }
                    
                    else{
                        tip.update(req.body).then(p => {
                            return res.json(p);
                        })
                    }
                }).catch(err => {
                    return res.json(err);
                });
            } else {
                return res.json({ message: "Tip nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });;
    });

    app.delete('/v2/tip/:id', async function(req, res) {
        const id = req.params.id;

        return Tip.findOne({ where: { id: id } }).then((tip) => {
            if (tip) {
                tip.destroy().then(p => {
                    return res.json({ message:"Izbrisan tip"})
                })
            } else {
                return res.json({ message: "Tip nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });;
    });
    
}

