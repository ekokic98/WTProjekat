var pocetak, kraj;

function iscrtajRaspored(div, dani, satPocetak, satKraj) {
  pocetak = satPocetak;
  kraj = satKraj;

  if (satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 || satKraj > 24 || !Number.isInteger(satPocetak) ||!Number.isInteger(satKraj)) {
    div.appendChild(document.createTextNode("Greška"));
  } 
  
  else {
    var tbl = document.createElement("table"), sirina = (satKraj - satPocetak) * 2;
    var tr = tbl.insertRow();

    for (var i = satPocetak; i < satKraj; i++) {
      var th = document.createElement("th");
      tr.appendChild(th);
      th.setAttribute("colSpan", 2);
      if (i == satPocetak) {
        if (i < 10) th.appendChild(document.createTextNode("0" + i + ":00"));
        else th.appendChild(document.createTextNode(i + ":00"));
      } 
      else if ((i % 2 == 0 && i < 14) || (i % 2 == 1 && i >= 15)) {
        if (i < 10) th.appendChild(document.createTextNode("0" + i + ":00"));
        else th.appendChild(document.createTextNode(i + ":00"));
      }
    }

    for (var i = 0; i < dani.length; i++) {
      var tr = tbl.insertRow();
      for (var j = 0; j <= sirina; j++) {
        var td = tr.insertCell();
        if (j == 0) {
          td.appendChild(document.createTextNode(dani[i]));
          td.className = "dan";
        }
      }
    }
    div.appendChild(tbl);
  }
}


function popraviRaspored(raspored) {
  var table = raspored.getElementsByTagName("table")[0];
  var rows = table.getElementsByTagName("tr");
  for (let red of rows) {
    if (red.cells[0].tagName != "TH") {
      var sati = 0;
      for (var i = 1; i < red.cells.length; i++) {
        sati += 1;
        if (red.cells[i].colSpan != 1) sati += red.cells[i].colSpan - 1;
        if (sati - red.cells[i].colSpan + 1 == 1 && sati % 2 == 0) red.cells[i].className = "obje-pune";
        else if (sati % 2 == 0) red.cells[i].className = "lijeva-isprekidana ";
        else red.cells[i].className = "desna-isprekidana";
      }
    }
  }
}

function dajRedDana(raspored, dan) {
  var table = raspored.getElementsByTagName("table")[0];
  var rows = table.getElementsByTagName("tr");
  for (var i = 1; i < rows.length; i++) {
    if (rows[i].cells[0].innerHTML == dan) return i;
  }
  return -1;
}

function obradi(raspored, vrijemePocetak, vrijemeKraj, brReda) {
  var table = raspored.getElementsByTagName("table")[0];
  var row = table.getElementsByTagName("tr")[brReda];
  var pozicija = 2 * (vrijemePocetak - pocetak) + 1;
  for (var i = 1; i < pozicija; i++) {
    if (row.cells[i].colSpan > 1) {
      if (i + row.cells[i].colSpan > pozicija) return -1;
      if (row.cells[i].colSpan > 1) pozicija -= row.cells[i].colSpan - 1;
    }
    if (i >= pozicija) break;
  }
  for (var j = pozicija; j < pozicija + 2 * (vrijemeKraj - vrijemePocetak); j++) {
    if (j >= kraj) break;
    if (row.cells[j].innerHTML != "") return -2;
  }
  return pozicija;
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
  if (vrijemePocetak < pocetak || vrijemeKraj > kraj) {
    alert("Greška - aktivnost koju želite dodati izlazi van okvira rasporeda");
    return false;
  } 
  
  else if (!raspored || raspored.getElementsByTagName("table").length == 0) {
    alert("Greška - raspored nije kreiran");
    return false;
  } 
  
  else if ((Number.isInteger(vrijemePocetak) == false && vrijemePocetak % 1 != 0.5) || (Number.isInteger(vrijemeKraj) == false && vrijemeKraj % 1 != 0.5) ||
    vrijemePocetak >= vrijemeKraj || vrijemePocetak < 0 || vrijemeKraj < 0 || vrijemePocetak > 24 || vrijemeKraj > 24) {
    alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
    return false;
  } 
  
  else {
    var table = raspored.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");
    var brReda = dajRedDana(raspored, dan);

    if (brReda == -1) {
      alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
      return false;
    } 
    
    else {
      var pozicija = obradi(raspored, vrijemePocetak, vrijemeKraj, brReda);

      if (pozicija == -1) {
        alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
        return false;
      } 
      
      else if (pozicija == -2) {
        alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
        return false;
      } 
      
      else {
        rows[brReda].cells[pozicija].colSpan = 2 * (vrijemeKraj - vrijemePocetak);
        rows[brReda].cells[pozicija].setAttribute("id", "nastava");
        rows[brReda].cells[pozicija].innerHTML = "<h3>" + naziv + "</h3>" + "<p>" + tip + "</p>";
        for (var i = 1; i < 2 * (vrijemeKraj - vrijemePocetak); i++) {
          if (pozicija + 1 != kraj) rows[brReda].deleteCell(pozicija + 1);
        }
        popraviRaspored(raspored);
      }

    }

  }
}
