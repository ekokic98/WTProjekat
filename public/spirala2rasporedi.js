  let okvir1 = document.getElementById("okvir1")
  iscrtajRaspored(okvir1,["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],8,23);
  
  dodajAktivnost(okvir1, "PJP", "vježbe", 14, 15, "Ponedjeljak");
  dodajAktivnost(okvir1, "PWS", "predavanje", 15, 16.5,  "Ponedjeljak");
  dodajAktivnost(okvir1, "PWS", "vježbe", 17, 18.5, "Ponedjeljak");
  dodajAktivnost(okvir1, "RG", "vježbe", 9, 11, "Utorak");
  dodajAktivnost(okvir1, "OOI", "predavanje", 12, 15, "Utorak");
  dodajAktivnost(okvir1, "OIS", "predavanje", 15, 16.5, "Utorak");
  dodajAktivnost(okvir1, "OIS", "vježbe", 17, 18.5, "Utorak");
  dodajAktivnost(okvir1, "WT", "predavanje", 9, 12, "Srijeda");
  dodajAktivnost(okvir1, "OOI", "vježbe", 12, 13, "Srijeda");
  dodajAktivnost(okvir1, "RG", "predavanje", 9, 11, "Četvrtak");
  dodajAktivnost(okvir1, "RG", "tutorijal", 12, 13, "Četvrtak");
  dodajAktivnost(okvir1, "PJP", "predavanja", 9, 12, "Petak");

  

  let okvir2 = document.getElementById("okvir2")
  iscrtajRaspored(okvir2,["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"],7,19);
  
  dodajAktivnost(okvir2, "TP", "predavanje", 9, 12, "Utorak");
  dodajAktivnost(okvir2, "WT", "predavanje", 10, 11.5, "Utorak"); //potpuno preklapanje
  dodajAktivnost(okvir2, "MLTI", "predavanje", 9, 12, "Petak");
  dodajAktivnost(okvir2, "IM2", "vježbe", 11, 13, "Petak"); //djelimicno desno preklapanje
  dodajAktivnost(okvir2, "VIS", "predavanje", 13, 16, "Ponedjeljak");
  dodajAktivnost(okvir2, "MLTI", "vježbe", 12.5, 14, "Ponedjeljak"); //djelimicno lijevo preklapanje
  dodajAktivnost(okvir2, "VIS", "vježbe", 19.5, 21, "Ponedjeljak"); //vrijeme van opsega
  dodajAktivnost(okvir2, "IM2", "predavanje", 12, 15, "Subota"); //ne postoji dan
  
 


  



