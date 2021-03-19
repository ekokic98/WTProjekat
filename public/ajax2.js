const serverUrl = "http://localhost:3000";

let spisakGrupa = [];

function ucitajPodatke() {
    $.ajax({ url: serverUrl + '/v2/grupa' }).then(data => {
        spisakGrupa = data;

        spisakGrupa.forEach(grupa => {
            document.getElementById("grupe").options.add(new Option(grupa.naziv, grupa.id));
        })
    });
}

document.getElementById("formaZaUnos").addEventListener('submit', e => {
    e.preventDefault();

    const forma = $("#formaZaUnos").serializeArray();

    const grupaId = forma.find(p => p.name == "grupa").value;

    const studentiText = forma.find(p => p.name == "studenti").value;

    // parsiranje 
    const studenti = [];

    const studentiSplit = studentiText.split('\n');

    studentiSplit.forEach(studentText => {

        if (studentText) {
            const split = studentText.split(",");

            if (split.length == 2) {
                const student = {
                    ime: split[0].trim(),
                    index: split[1].trim()
                }

                studenti.push(student);
            }
        }
    })

    if (studenti.length > 0) {
        $.post({
            url: serverUrl + '/v2/dodajStudente',
            data: {
                studenti: studenti,
                grupaId: grupaId
            },
        }).then(r => {
            const poruke = r.poruke;

            if (poruke.length > 0) {
                let poruka = poruke.join("\n");
                document.getElementById('studenti').value = poruka;
            }
        })
    }
})
