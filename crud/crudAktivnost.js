const sequelize = require("../baza.js");
const Aktivnost = sequelize.models.Aktivnost;


module.exports = function (app) {
    app.get('/v2/aktivnost', async function(req,res){ 
        const sveAktivnosti = await Aktivnost.findAll();
        res.json(sveAktivnosti);
    })

    app.get('/v2/aktivnost/:id', async function(req,res){ 
        const aktivnost = await Aktivnost.findOne({ where: { id: req.params.id } });
            if (aktivnost === null) {
                return res.json({ message: "Ne postoji aktivnost sa tim ID-jem" })
            } else {
                return res.json(aktivnost);
            }
    })

    app.post('/v2/aktivnost', async function(req, res){
        
        let pocetak = Number(req.body.pocetak);
        let kraj = Number(req.body.kraj);

        if(req.body.pocetak > req.body.kraj){
            console.log("pocetak: " + pocetak + " kraj: " + kraj);
            return res.json({ message: 'Aktivnost nije validna!' })
        } 

        else if ((Number.isInteger(pocetak) == false && pocetak % 1 != 0.5) || (Number.isInteger(kraj) == false && kraj % 1 != 0.5) ||
        pocetak >= kraj || pocetak < 8 || kraj < 8 || pocetak > 20 || kraj > 20) {
            console.log("pocetak: " + pocetak + " kraj: " + kraj);
            return res.json({ message: 'Aktivnost nije validna!' })
        } 

        else{

            const sveAktivnosti =  await Aktivnost.findAll(); 
            for (var i = 0; i < sveAktivnosti.length; i++){
                let aktivnost = sveAktivnosti[i]; 
                if(aktivnost.DanId == req.body.DanId){ 
                    if( ((req.body.pocetak <= aktivnost.pocetak) && (req.body.kraj > aktivnost.pocetak) && (req.body.kraj <= aktivnost.kraj)) ||
                        ((req.body.pocetak >= aktivnost.pocetak) && (req.body.pocetak < aktivnost.kraj) && (req.body.kraj >= aktivnost.kraj)) ||
                        ((req.body.pocetak > aktivnost.pocetak) && (req.body.kraj < aktivnost.kraj)) ||
                        ((req.body.pocetak < aktivnost.pocetak) && (req.body.kraj > aktivnost.kraj)) ||
                        ((req.body.pocetak == aktivnost.pocetak) && (req.body.kraj == aktivnost.kraj))){
                            return res.json( { message: 'Aktivnost nije validna!'} )
                        }
                }
            }  
    
            const aktivnost = await Aktivnost.create({
                //where: { naziv: req.body.naziv },
                naziv: req.body.naziv,
                pocetak: req.body.pocetak, 
                kraj: req.body.kraj,
                PredmetId: req.body.PredmetId,
                GrupaId: req.body.GrupaId,
                DanId: req.body.DanId,
                TipId: req.body.TipId      
              }).catch(err => {
                  return res.json(err);
              });
            res.json(aktivnost)           
        }
        
    });

    app.put('/v2/aktivnost/:id', async function(req, res) {
        const id = req.params.id;

        const sveAktivnosti =  await Aktivnost.findAll(); 
            for (var i = 0; i < sveAktivnosti.length; i++){
                let aktivnost = sveAktivnosti[i]; 
                if(aktivnost.DanId == req.body.DanId){ 
                    if( ((req.body.pocetak <= aktivnost.pocetak) && (req.body.kraj > aktivnost.pocetak) && (req.body.kraj <= aktivnost.kraj)) ||
                        ((req.body.pocetak >= aktivnost.pocetak) && (req.body.pocetak < aktivnost.kraj) && (req.body.kraj >= aktivnost.kraj)) ||
                        ((req.body.pocetak > aktivnost.pocetak) && (req.body.kraj < aktivnost.kraj)) ||
                        ((req.body.pocetak < aktivnost.pocetak) && (req.body.kraj > aktivnost.kraj)) ||
                        ((req.body.pocetak == aktivnost.pocetak) && (req.body.kraj == aktivnost.kraj))){
                            return res.json( { message: 'Aktivnost nije validna!'} )
                        }
                }
            }  
            
        let pocetak = Number(req.body.pocetak);
        let kraj = Number(req.body.kraj);

        if(req.body.pocetak > req.body.kraj){
            return res.json({ message: 'Aktivnost nije validna!' })
        } 

        else if ((Number.isInteger(pocetak) == false && pocetak % 1 != 0.5) || (Number.isInteger(kraj) == false && kraj % 1 != 0.5) ||
        pocetak >= kraj || pocetak < 8 || kraj < 8 || pocetak > 20 || kraj > 20) {
            return res.json({ message: 'Aktivnost nije validna!' })
        } 

        return Aktivnost.findOne({ where: { id: id } }).then((aktivnost) => {
            if (aktivnost) {
                Aktivnost.findOne({where : {    naziv: req.body.naziv,
                                                pocetak: req.body.pocetak, 
                                                kraj: req.body.kraj,
                                                PredmetId: req.body.PredmetId,
                                                GrupaId: req.body.GrupaId,
                                                DanId: req.body.DanId,
                                                TipId: req.body.TipId}}).then((provjera) => {
                    if(provjera){
                        return res.json({ message: "Već postoji ova aktivnost" })
                    }


                    
                    else{
                        aktivnost.update(req.body).then(p => {
                            return res.json(p);
                        })
                    }
                }).catch(err => {
                    return res.json(err);
                });
            } else {
                return res.json({ message: "Aktivnost nije nađena." })
            }

        }).catch(err => {
            return res.json(err);
        });;
    });

    app.delete('/v2/aktivnost/:id', async function(req, res) {
        const id = req.params.id;

        return Aktivnost.findOne({ where: { id: id } }).then((aktivnost) => {
            if (aktivnost) {
                aktivnost.destroy().then(p => {
                    return res.json({ message:"Izbrisana aktivnost"})
                })
            } else {
                return res.json({ message: "Aktivnost nije nađena." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });
    
}