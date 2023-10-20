function prenota() {

    var empValue = checkEmptyValue();
    var maxSup = maxSupera();
    var emptyRoom = checkEmptyRoom();
    var money = calcoloPrezzo();

    if (empValue == true) {
        alert("Dati Mancanti");
    } else {
        if (maxSup == true) {
            alert("La stanza non può contentere così tante persone");
        } else {
            if (emptyRoom == false) {
                alert("Stanza non disponibile");
            } else {
                if (money <= 0) {
                    alert("Inserire date valide");
                } else {
                    window.open("./conferma.html");
                }
            }
        }
    }
}

function calcoloPrezzo() {
    var tipoCamere = document.getElementById("roomType").value;
    var prezzoStanza = [100, 200, 300, 400, 500];
    var persona = document.getElementById("quantepersone").value;
    var numPersona = parseInt(persona.slice(1));

    switch (tipoCamere) {
        case "tokyo":
            prezzoTotale = numPersona * prezzoStanza[0] * prezzoGiorno();
            break;
        case "berlino":
            prezzoTotale = numPersona * prezzoStanza[1] * prezzoGiorno();
            break;
        case "lisbona":
            prezzoTotale = numPersona * prezzoStanza[2] * prezzoGiorno();
            break;
        case "stoccolma":
            prezzoTotale = numPersona * prezzoStanza[3] * prezzoGiorno();
            break;
        case "mosca":
            prezzoTotale = numPersona * prezzoStanza[4] * prezzoGiorno();
            break;
    }
    document.getElementById("sgancialagrana").innerHTML = prezzoTotale.toFixed(2) + " €";
    return (prezzoTotale);
}
setInterval(calcoloPrezzo, 2000);

function prezzoGiorno() {
    var sovraprezzo = [1, 1.1, 1.3, 1.1, 1, 1, 1.1, 1.3, 1.1, 1, 1, 1.1, 1.3, 1.1, 1,
        1, 1.1, 1.3, 1.1, 1, 1, 1.1, 1.3, 1.1, 1, 1, 1.1, 1.3, 1.1, 1];
    var dataingresso = new Date(document.getElementById("datein").value);
    var datauscita = new Date(document.getElementById("dateout").value);
    var durata = datauscita.getDate() - dataingresso.getDate();
    var variazionePrezzo = 0;

    for (var i = (dataingresso.getDate() - 1); i < (datauscita.getDate() - 1); i++) {
        variazionePrezzo = variazionePrezzo + parseFloat(sovraprezzo[i]);
    }
    return parseFloat(variazionePrezzo);
}

function maxSupera() {
    var personeMax = [1, 1, 2, 2, 5];
    var maxSuperato = false;
    var tipoCamere = document.getElementById("roomType").value;
    var persona = document.getElementById("quantepersone").value;
    var numPersona = parseInt(persona.slice(1));

    switch (tipoCamere) {
        case "tokyo":
            maxSuperato = (numPersona <= personeMax[0]) ? false : true;
            break;
        case "berlino":
            maxSuperato = (numPersona <= personeMax[1]) ? false : true;
            break;
        case "lisbona":
            maxSuperato = (numPersona <= personeMax[2]) ? false : true;
            break;
        case "stoccolma":
            maxSuperato = (numPersona <= personeMax[3]) ? false : true;
            break;
        case "mosca":
            maxSuperato = (numPersona <= personeMax[4]) ? false : true;
            break;
    }
    return (maxSuperato);
}

function checkEmptyValue() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var dataIngresso = new Date(document.getElementById("datein").value);
    var dataUscita = new Date(document.getElementById("dateout").value);
    var DI = dataIngresso.getDate();
    var DU = dataUscita.getDate();

    var emptyValueName = isEmpty(name);
    var emptyValuePhone = isEmpty(phone);

    // var emptyValueDI = ; 
    // var emptyValueDT = ; || (emptyValueDI== true) || (emptyValueDT== true)

    //var NaNDate = (DI == Number.NaN);

    if ((emptyValueName == true) || (emptyValuePhone == true)) {
        return true;
    } else {
        return false;
    }
}

function checkEmptyRoom() {
    var giorniOccupati = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    var dataIngresso = new Date(document.getElementById("datein").value);
    var dataUscita = new Date(document.getElementById("dateout").value);
    var cameraLibera = true;

    for (var i = (dataIngresso.getDate() - 1); i < (dataUscita.getDate() - 1); i++) {
        if (giorniOccupati[i] == 1) {
            cameraLibera = false;
            for (j = i; j > (dataIngresso.getDate() - 1); j--) {
                giorniOccupati[j] = 0;
            }
        } else {
            giorniOccupati[i] = 1;
        }
    }
    return cameraLibera;
}


function isEmpty(val) {
    return (val === undefined || val === null || val.length <= 0) ? true : false;
}