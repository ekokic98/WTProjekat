const fs = require("fs")

module.exports=function(app){
    app.get('/v1/predmeti', function(req,res){ 
        fs.readFile('predmeti.txt', "utf-8", (err, contents) => {  
            if (err) {
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw err;
            }
        
            let spisakPredmeta = contents.toString().split("\n");
            let spisakVracenihPredmeta = [];
    
            for (var i = 0; i < spisakPredmeta.length; i++) {
                let predmet = spisakPredmeta[i].toString().split("\n");
                let objekat = {
                    naziv : predmet[0]
                }
    
                spisakVracenihPredmeta.push(objekat);
            }
            
            spisakVracenihPredmeta.length-=1;
            return res.json(spisakVracenihPredmeta);
    })});
    
    app.get('/v1/aktivnosti', function(req,res){ 
        fs.readFile('aktivnosti.txt', "utf-8", (err, contents) => {  
            if (err) {
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw err;
            }
        
            let spisakAktivnosti = contents.toString().split("\n");
            let spisakVracenihAktivnosti = [];
    
            for (var i = 0; i < spisakAktivnosti.length; i++) {
                let aktivnost = spisakAktivnosti[i].toString().split(",");
                let objekat = {
                    naziv : aktivnost[0],
                    tip : aktivnost[1],
                    pocetak : Number(aktivnost[2]),
                    kraj : Number(aktivnost[3]),
                    dan : aktivnost[4]
                }
    
                spisakVracenihAktivnosti.push(objekat);
            }
            
            spisakVracenihAktivnosti.length-=1;
            res.json(spisakVracenihAktivnosti);
    })});   
    
    app.get('/v1/predmet/:naziv/aktivnost', function(req,res){ 
        fs.readFile('aktivnosti.txt', "utf-8", (err, contents) => {  
            if (err) {
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw err;
            }
        
            let spisakAktivnosti = contents.toString().split("\n");
            let spisakVracenihAktivnosti = [];
    
            for (var i = 0; i < spisakAktivnosti.length; i++) {
                let aktivnost = spisakAktivnosti[i].toString().split(",");
                if(aktivnost[0] == req.params.naziv)
                {
                  let objekat = {
                  naziv : aktivnost[0],
                  tip : aktivnost[1],
                  pocetak : Number(aktivnost[2]),
                  kraj : Number(aktivnost[3]),
                  dan : aktivnost[4]
                }
                  spisakVracenihAktivnosti.push(objekat);
                }
              }
        
            res.json(spisakVracenihAktivnosti);
    
    })});
    
    
    app.post('/v1/predmet', function(req, res) { 
        fs.readFile('predmeti.txt', "utf-8", (err, contents) => {  
            if (err) {
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw err;
            }
        
            let spisakPredmeta = contents.split("\n");
            var postojiPredmet=false;
        
            for (var i = 0; i < spisakPredmeta.length; i++) {
              if(spisakPredmeta[i]==req.body["naziv"])
              {
                postojiPredmet=true;
                break;
              }
            }
    
            if(postojiPredmet==true)
                res.json({ message: 'Naziv predmeta postoji!' })
    
            else
            {
                fs.appendFile('predmeti.txt', req.body["naziv"]+"\n", function (err) {
                    if (err) throw err;
                });
                res.json({ message: 'Uspješno dodan predmet!' });
            }
        });
    });
    
    function provjeraVremena(spisakAktivnosti, pocetak, kraj, dan) {
        for (var i = 0; i < spisakAktivnosti.length; i++){
            let aktivnost = spisakAktivnosti[i].toString().split(",");
            if(aktivnost[4] == dan){
                if( ((pocetak <= aktivnost[2]) && (kraj > aktivnost[2]) && (kraj <= aktivnost[3])) ||
                    ((pocetak >= aktivnost[2]) && (pocetak < aktivnost[3]) && (kraj >= aktivnost[3])) ||
                    ((pocetak > aktivnost[2]) && (kraj < aktivnost[3])) ||
                    ((pocetak < aktivnost[2]) && (kraj > aktivnost[3])) ||
                    ((pocetak == aktivnost[2]) && (kraj == aktivnost[3]))){
                        return true;
                    }
            }
        }
        return false;
    }
        
    app.post('/v1/aktivnost', function(req, res) { 
        fs.readFile('aktivnosti.txt', "utf-8", (err, contents) => {  
            if (err) {
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw err;
            }
            
            let pocetak = Number(req.body["pocetak"]);
            let kraj = Number(req.body["kraj"]);
            let spisakAktivnosti = contents.split("\n");
            if(provjeraVremena(spisakAktivnosti,pocetak,kraj,req.body["dan"])){
                res.status(400);
                return res.json({ message: 'Aktivnost nije validna!' });
            }
    
            else if(Number(pocetak) > Number(kraj)){
                res.status(400);
                return res.json({ message: 'Aktivnost nije validna!' })
            } 
    
            else if ((Number.isInteger(pocetak) == false && pocetak % 1 != 0.5) || (Number.isInteger(kraj) == false && kraj % 1 != 0.5) ||
            pocetak >= kraj || pocetak < 8 || kraj < 8 || pocetak > 20 || kraj > 20) {
                res.status(400);
                return res.json({ message: 'Aktivnost nije validna!' })
            } 
    
    
            else{
                fs.appendFile('aktivnosti.txt', req.body["naziv"] + "," + req.body["tip"] + "," + pocetak + "," + kraj +"," + req.body["dan"]+ "\n", function (err) {
                if (err) throw err;
            });
               res.json({ message: 'Uspješno dodana aktivnost!' });
            }
        });
    });
    
    app.delete('/v1/predmet/:naziv', function (req, res) {
        let spisakPredmeta=[];
        let listaObjekata = [];
        fs.readFile('predmeti.txt', "utf-8", (err, contents) => {  
          if (err) {
              res.writeHead(504, {'Content-Type': 'application/json'});
              throw err;
          }
          spisakPredmeta = contents.split("\n");
          for (var i = 0; i < spisakPredmeta.length-1; i++) {
            let objekat = {naziv:spisakPredmeta[i]};
            listaObjekata.push(objekat);
          }
          if (listaObjekata.some(e => e.naziv === req.params.naziv)) {
            fs.truncate('predmeti.txt', 0, function(err){ //asinhrona funkcija ne stigne se zatvoriti fajl pa se izbriše - popraviti i brisanje aktivnosti
                if (err) {
                    res.writeHead(504, {'Content-Type': 'application/json'}); 
                    throw err;
                }
    
                let niz = spisakPredmeta.filter(function(e){
                    return e!= req.params["naziv"];
                  })
                  var linesExceptFirst =niz.join("\n");
                  fs.appendFile('predmeti.txt',linesExceptFirst, function (err) {
                    if (err) throw err;
                  });
                  res.json({ message: 'Uspješno obrisan predmet!'});
            })
              
          }
          else
          res.json({ message: 'Greška - predmet nije obrisan!'});
      
      });
    });
    
    app.delete('/v1/aktivnost/:naziv', function (req, res) { 
        let spisakAktivnosti=[];
        let listaObjekata = [];
        fs.readFile('aktivnosti.txt', "utf-8", (err, contents) => {  
          if (err) {
              res.writeHead(504, {'Content-Type': 'application/json'});
              throw err;
          }
          spisakAktivnosti = contents.split("\n");
          for (var i = 0; i < spisakAktivnosti.length; i++) {
            let aktivnost = spisakAktivnosti[i].toString().split(",");
                {
                  let objekat = {
                  naziv : aktivnost[0],
                  tip : aktivnost[1],
                  pocetak : Number(aktivnost[2]),
                  kraj : Number(aktivnost[3]),
                  dan : aktivnost[4]
                }
                  listaObjekata.push(objekat);
                }
          }
          if (listaObjekata.some(e => e.naziv ===req.params.naziv)) {
            fs.truncate('aktivnosti.txt', 0, function(err){
                if (err) {
                    res.writeHead(504, {'Content-Type': 'application/json'}); 
                    throw err;
                }
                let niz = spisakAktivnosti.filter(function(e){
                    return e.split(",")[0]!=req.params.naziv;
                  })
                  var linesExceptFirst =niz.join("\n");
                  fs.appendFile('aktivnosti.txt',linesExceptFirst, function (err) {
                    if (err) throw err;
                  });
                  res.json({ message: 'Uspješno obrisana aktivnost!'});
            })
            
          }
          else
          res.json({ message: 'Greška - aktivnost nije obrisana!'});
      
      });
    });
    
    app.delete('/v1/all', function(req,res){ 
        fs.writeFile('predmeti.txt', '', function(err){
            if (err){
                res.json({message: "Greška - sadržaj datoteka nije moguće obrisati!"});  
            } 
            else{
                const fstemp = require('fs');
                fstemp.writeFile('aktivnosti.txt', '', function(err){
                    if (err) res.json({message: "Greška - sadržaj datoteka nije moguće obrisati!"});
                    else res.json({message: "Uspješno obrisan sadržaj datoteka!"});
                })
            }
        })
    })
    
}