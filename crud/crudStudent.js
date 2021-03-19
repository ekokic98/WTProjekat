const sequelize = require("../baza.js");
const Student = sequelize.models.Student;
const Grupa = sequelize.models.Grupa;

//ZAVRŠENO

module.exports = function (app) {
    app.get('/v2/student', async function(req,res){ 
        const sviStudenti = await Student.findAll(); //await može samo unutar async funkcije, zablokira izvišavanje funkcije
        res.json(sviStudenti);
    })

    app.get('/v2/student/:id', async function(req,res){ 
        const student = await Student.findOne({ where: { id: req.params.id } });
            if (student === null) {
                return res.json({ message: "Ne postoji student sa tim ID-jem" })
            } else {
                return res.json(student);
            }
    })
    

    app.post('/v2/student', async function(req, res){
        const student = await Student.findOrCreate({
            where: { index: req.body.index },
            defaults: { ime: req.body.ime }
          }).catch(err => {
            return res.json(err);
        });
        res.json(student)
    });

    app.put('/v2/student/:id', async function(req, res) {
        const id = req.params.id;

        return Student.findOne({ where: { id: id } }).then((student) => {
            if (student) {
                Student.findOne({where : { index : req.body.index}}).then((provjera) => {
                    if(provjera){
                        return res.json({ message: "Već postoji student sa ovim indexom." })
                    }
                    
                    else{
                        student.update(req.body).then(p => {
                            return res.json(p);
                        })
                    }
                }).catch(err => {
                    return res.json(err);
                });
            
            } else {
                return res.json({ message: "Student nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });

    app.delete('/v2/student/:id', async function(req, res) {
        const id = req.params.id;

        return Student.findOne({ where: { id: id } }).then((student) => {
            if (student) {
                student.destroy().then(p => {
                    return res.json({ message:"Izbrisan student"})
                })
            } else {
                return res.json({ message: "Student nije nađen." })
            }

        }).catch(err => {
            return res.json(err);
        });
    });

    app.post("/v2/dodajStudente", async (req, res) => {
        const { studenti } = req.body;

        let GrupaId = Number(req.body.grupaId); //jer joj se mijenja vrijednost

        const grupa = await Grupa.findOne({ where: { id: GrupaId } })

        const kreiraniStudenti = [];
        const nizPoruka = [];

        for(let student of studenti){
            let provjera = await Student.findOne({where : { index : student.index}});
            
                if(provjera){
                    if (provjera.ime == student.ime) {   
                        await grupaPromjenaIzmjena(provjera, grupa);
                    }
                    else{
                        nizPoruka.push("Student " + student.ime + " nije kreiran jer postoji student " + provjera.ime + " sa istim indexom " + provjera.index);
                    }
                }
                
                else{
                    await Student.create({ GrupaId: GrupaId, index: student.index, ime: student.ime })
                    .then(noviStudent => {
                        return noviStudent.addGrupa(grupa).then(() => kreiraniStudenti.push(noviStudent))
                    }).catch(err => {
                        return res.json(err);
                    })
                }
        
        }

        if (nizPoruka.length == 0) {    
            res.status(200);
        }
        
        return res.json({
            kreirani: kreiraniStudenti,
            poruke: nizPoruka
        });

    });

    async function grupaPromjenaIzmjena(student, grupa) {
        const grupeStudenta = await student.getGrupas();
        for(let s of grupeStudenta){
            if (s.PredmetId == grupa.PredmetId) {      
                await student.removeGrupa(s);
                await student.addGrupa(grupa);
                return;
            }
        }
        return student.addGrupa(grupa);    
    }
}