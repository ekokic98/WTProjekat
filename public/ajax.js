let serverUrl = "http://localhost:3000";

let spisakPredmeta = [];
let spisakAktivnosti = [];

function ucitajPodatke(){
    $.ajax({
        url: serverUrl + '/v2/predmet', success: function (data) {
            spisakPredmeta = data;
        }
    });

    $.ajax({
        url: serverUrl + '/v2/aktivnost', success: function (data) {
            spisakAktivnosti = data;
        }
    });

    $.ajax({ url: serverUrl + '/v2/dan' }).then(data => {
        spisakDana = data;

        spisakDana.forEach(dan => {
            document.getElementById("dani").options.add(new Option(dan.naziv));
        })
    });

    $.ajax({ url: serverUrl + '/v2/tip' }).then(data => {
        spisakTipova = data;

        spisakTipova.forEach(tip => {
            document.getElementById("tipovi").options.add(new Option(tip.naziv));
        }) 
    });
}

$('#formaZaUnos').on('submit', e => {

    e.preventDefault(); 
    let forma = $('#formaZaUnos').serializeArray(); 
    let povrat = forma.map(a => a.value);
    console.log(povrat)

    let TipId, DanId;

    $.get({
        url: serverUrl + '/v2/tiptreci/' + povrat[1],
    }).done((result) => {
        TipId = result;
        console.log("Tip1: " + TipId);
        $.get({
            url: serverUrl + '/v2/dantreci/' + povrat[4],
        }).done((result1) => {
            DanId = result1;
            console.log("Dan1: " + DanId);
            $.get({
                url: serverUrl + '/v2/predmettreci/' + povrat[0],
            }).done((result2) => {
                console.log("Dan1: " + DanId);
                aktivnost = {naziv: povrat[0], pocetak: povrat[2], kraj: povrat[3], PredmetId: result2, DanId: result1, TipId: result1, GrupaId: 1}
                $.post({
                    url: serverUrl + '/v2/aktivnost',
                    data: aktivnost,
                }).done((result5) => {

                }).fail((result5) => {

                })
            }).fail((result2) => {
                
            })
        }).fail((result1) => {
            
        })
    }).fail((result) => {
        
    })
        
    })