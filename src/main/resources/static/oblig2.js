// funksjonen kalles nar indexen er klar
$.get("/vis",function (data){
    $("#visBilletter").html(data)
})

// denne funksjonen skjekker om vediene som blir lagt inn ikke er tomme
function tommeVerdier(verdi){

    switch (verdi){
        case "":
        case null:
            return true
        default:
            return false
    }
}

// her sjekker vi om dataene vi får inn er riktige om de ikke er sa skal den gi beskjed
function sjekkInnhold(){

    const antall = document.getElementById("antall").value.trim()
    const fornavn = document.getElementById("fornavn").value.trim()
    const etternavn = document.getElementById("etternavn").value.trim()
    const telefonnr = document.getElementById("telefonnr").value.trim()
    const epost = document.getElementById("epost").value.trim()
    const film = document.getElementById("dropdown").value.trim()

// denne returnerer true om alle inputene er gyldige

    let x = true
    if(tommeVerdier(antall) || isNaN(antall) || antall <= 0 || antall > 999){
        document.getElementById("feilAntall").innerHTML=
            " Må skrive inn noe i antall og kan ikke inneholde bostaver".fontcolor("red")
        x = false
    }
    else {
        document.getElementById("feilAntall").innerHTML=""
    }
    if(tommeVerdier(fornavn) || !isNaN(fornavn)) {
        document.getElementById("feilFornavn").innerHTML =
            "Må skrive inn noe i fornavn og kan ikke inneholde tall".fontcolor("red")
        x = false
    }
    else {
        document.getElementById("feilFornavn").innerHTML=""
    }
    if(tommeVerdier(etternavn) || !isNaN(etternavn)){
        document.getElementById("feilEtternavn").innerHTML=
            "Må skrive inn noe i etternavn og kan ikke inneholde tall".fontcolor("red")
        x = false
    }
    else {
        document.getElementById("feilEtternavn").innerHTML=""
    }
    if(tommeVerdier(telefonnr) || isNaN(telefonnr)){
        document.getElementById("feilTelefonnr").innerHTML="Må skrive inn noe i telefonnr"
            .fontcolor("red")
        x = false
    }
    else {
        document.getElementById("feilTelefonnr").innerHTML=""
    }
    if(tommeVerdier(epost) || !epost.includes(".") || !epost.includes("@")){
        document.getElementById("feilEpost").innerHTML="Må skrive inn noe i epost. Ikke glem @ og .!"
            .fontcolor("red")
        x = false
    }
    else {
        document.getElementById("feilEpost").innerHTML=""
    }
    if(film == "none"){
        document.getElementById("feilFilm").innerHTML="Velg film"
            .fontcolor("red")
        x = false
    }
    else {
        document.getElementById("feilFilm").innerHTML=""
    }
    if(x){

        leggInn(antall, fornavn, etternavn, telefonnr, epost, film)
    }
}

// her legger vi inn verdiene inn i arrayaet
function leggInn(innantall, innfornavn, innetternavn, inntelefonnr, innepost, innfilm){
    const billettData ={
        fornavn: innfornavn,
        etternavn: innetternavn,
        telefonnr: inntelefonnr,
        epost: innepost,
        film: innfilm,
        antall: innantall
    };
    console.log("Hajhaini")
    $.post("/leggInn",billettData,function (){
        $.get("/vis",function (data){
            $("#visBilletter").html(data)
        })
    })

    // kaller pa skrive ut metoden og fjerner alt i input boksene

    fjernVerdierIBoks()
}

// skriver ut alt av lagrede infromasjon
function skrivUtbilettinfo(){

    let skrivUt =
        "<table><tr><th>Film </th><th>Antall </th><th>Fornavn </th>" +
        "<th>Etternavn </th><th>Telefonnr </th><th>Epost </th></tr><br>"

    for(let i = 0; i < billettInfo.length; i++){

        skrivUt += "<tr><td>" + billettInfo[i].kundeFilm + "</td>" + "<td>" + billettInfo[i].kundeAntall +
            "</td>" + "<td>" + billettInfo[i].kundeFornavn +
            "</td>" + "<td>" + billettInfo[i].kundeEtternavn + "</td>" + "<td>" +
            billettInfo[i].kundeTelefonnr + "</td>" + "<td>" + billettInfo[i].kundeEpost + "</td></tr>"
    }

    document.getElementById("visBilletter").innerHTML = skrivUt
}

// metode som fjerner verdier fra arrayet
function slettVerdier(){

    $.post("/slett",function (){

    })

    $.get("/vis",function (data){
        $("#visBilletter").html(data)
    })

}

// fjerner alt inn i input boksene
function fjernVerdierIBoks(){

    document.getElementById("antall").value = ""
    document.getElementById("fornavn").value = ""
    document.getElementById("etternavn").value = ""
    document.getElementById("telefonnr").value = ""
    document.getElementById("epost").value = ""
    document.getElementById("dropdown").value = "none"}
