const sequelize = require("../baza.js");
const Grupa = sequelize.models.Grupa;

//ZAVRŠENO

module.exports = function (app) {
    app.get('/v2/grupa', async function(req,res){ 
        const sveGrupe = await Grupa.findAll();
        res.json(sveGrupe);
    })

    app.get('/v2/grupa/:id', async function(req,res){ 
        const grupa = await Grupa.findOne({ where: { id: req.params.id } });
            if (grupa === null) {
                return res.json({ message: "Ne postoji grupa sa tim ID-jem" })
            } else {
                return res.json(grupa);
            }
    })

    app.post('/v2/grupa', async function(req, res){
        const grupa = await Grupa.findOrCreate({
            where: { naziv: req.body.naziv, PredmetId: req.body.PredmetId }/*,
            defaults: { PredmetId: req.body.PredmetId}*/
          }).catch(err => {
            return res.json(err);
        });
        res.json(grupa)
    });

    app.put('/v2/grupa/:id', async function(req, res) {
        const id = req.params.id;

        return Grupa.findOne({ where: { id: id } }).then((grupa) => {
            if (grupa) {
                Grupa.findOne({where : { naziv : req.body.naziv, PredmetId: req.body.PredmetId }}).then((provjera) => {
                    if(provjera){
                        return res.json({ message: "Već postoji ova grupa" })
                    }
                    
                    else{
                        grupa.update(req.body).then(p => {
                            return res.json(p);
                        })
                    }
                }).catch(err => {
                    return res.json(err);
                });
            } else {
                return res.json({ message: "Grupa nije nađena." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });

    app.delete('/v2/grupa/:id', async function(req, res) {
        const id = req.params.id;

        return Grupa.findOne({ where: { id: id } }).then((grupa) => {
            if (grupa) {
                grupa.destroy().then(p => {
                    return res.json({ message:"Izbrisana grupa"})
                })
            } else {
                return res.json({ message: "Grupa nije nađena." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });
    
}