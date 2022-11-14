let _NOMBRE_CLIENTE; // Almacenara el nombre del usuario

window.onload = () => {
    bloquearTeclado(); // El bot no permite escribir hasta dar opciones
    escribirMensaje("letI", 500, 500); // Letiable HTML, retardo de "escribiendo...", duracion del "escribiendo..."
    escribirMensaje("letII", 1500, 750);
}

const bloquearTeclado = () => {
    const input = document.getElementById("readText"); // Selecciona el input del usuario
    const button = document.getElementById("btnReadText"); // Seleccion el boton del usuario

    input.setAttribute("readonly", "readonly"); // Bloquea el input
    button.removeAttribute("onclick"); // Bloquea el boton

    input.style.background = "#AAAAAA"; // Se oscurece el input
    button.style.background = "#191050"; // Se oscurece el button
    button.style.color = "#999999";

    input.value = ""; // Se limpia el input
}

const desbloquearTeclado = destino => {
    const input = document.getElementById("readText"); // Selecciona el input del usuario
    const button = document.getElementById("btnReadText"); // Seleccion el boton del usuario

    input.removeAttribute("readonly"); // Desbloquea el input
    button.setAttribute("onclick", destino); // Desbloquea el botton y define funcion de destino

    input.style.background = "#F5F5F5"; // Se aclarece el input
    button.style.background = "#303F9F"; // Se aclarece el button
    button.style.color = "#F5F5F5";
}

const escribirMensaje = (letiable, delay1, delay2) => {
    setTimeout(() => {
        asistenteEscribiendo(); // Dispara el mensaje de "escribiendo..." por parte del Bot
        setTimeout(() => { msjAsistente(letiable) }, delay2); // Dispara el mensaje del Bot
    }, delay1);
}

const asistenteEscribiendo = () => {
    const nameAssistant = document.getElementById("nameAssistant").innerHTML; // Obtiene el nombre del Bot
    const assisWrite = document.createElement("div"); // Crea el mensaje vacio

    assisWrite.id = "assisWrite"; // Define ID del mensaje
    assisWrite.innerHTML = `<p id="textAssisWrite">${nameAssistant} esta escribiendo...</p><div id="loadMsjAssis"></div>`; // Llena el mensaje
    contAssistant.appendChild(assisWrite); // Introduce el mensaje dentro del chat

    fixScroll(); // Scrollea hasta abajo;
}

const msjAsistente = leti => {
    let dataToWrite = document.getElementById(leti).innerHTML; // Obtiene la "letiable html" (div) seleccionado mediante ID, ej: letII
    const letNum = leti.substring(3, leti.length); // Obtiene el numero de la "letiable", quitando los primeros 3 caracteres
    const hourAssis = document.createElement('p'); // Creacion de "hora" del mensaje del Bot
    const textAssis = document.createElement('p'); // Creacion de "texto" del mensaje del Bot
    const contAssistant = document.getElementById('contAssistant'); // Selecciona el chat entero

    $('#assisWrite').remove(); // Elimina mensaje "escribiendo" del bot

    if (letNum == "IV") dataToWrite += _NOMBRE_CLIENTE + "!"; // Especifico para nombrar al cliente
    if (letNum == "XIII") dataToWrite += _NOMBRE_CLIENTE + "!"; // Especifico para nombrar al cliente

    hourAssis.className = "hourAssisLeft"; // Define Class de la hora del msj del Bot
    textAssis.className = "textAssisLeft"; // Define Class del texto del msj del Bot

    hourAssis.id = `hourAssisLeft${letNum}`; // Define ID de la hora junto al numero de "letiable"
    textAssis.id = `textAssisLeft${letNum}`; // Define ID del texto junto al numero de "letiable"

    hourAssis.innerHTML = horaActual(); // Obtiene la hora en la que el mensaje es enviado
    textAssis.innerHTML = dataToWrite; // Obtiene la respuesta del mensaje segun la letiable html

    contAssistant.appendChild(hourAssis); // Introduce la hora del msj dentro del chat
    contAssistant.appendChild(textAssis); // Introduce el texto del msj dentro del chat

    determinarAccion(letNum); // En base a la letiable, el programa avanza de forma determinada
    fixScroll(); // Scrollea hasta abajo;
}

const msjCliente = data => {
    bloquearTeclado(); // Una vez escrito el nombre

    const contAssistant = document.getElementById("contAssistant"); // Selecciona el chat entero
    const hourClient = document.createElement("p"); // Creacion de "hora" del mensaje del Usuario
    const textClient = document.createElement("p"); // Creacion de "texto" del mensaje del Usuario

    hourClient.className = "hourClientRight"; // Define Class de la hora del msj del Usuario
    textClient.className = "textClientRight"; // Define Class del texto del msj del Usuario

    hourClient.id = "horaCliente"; // Define ID de la hora del Usuario
    textClient.id = "textoCliente"; // Define ID del texto del Usuario

    hourClient.innerHTML = horaActual(); // Obtiene la hora en la que el mensaje es enviado
    textClient.innerHTML = data; // Se envia la respuesta del mensaje segun el usuario

    contAssistant.appendChild(hourClient); // Introduce la hora del msj dentro del chat
    contAssistant.appendChild(textClient); // Introduce el texto del msj dentro del chat

    fixScroll(); // Scrollea hasta abajo
}

const fixScroll = () => {
    // Scrollea hasta abajo del chat cuando sea ejecutado //
    $("#contAssistant").animate({ scrollTop: $('#contAssistant')[0].scrollHeight }, 100);
}

const determinarAccion = letiable => {
    switch (letiable) { // Desbloquea al teclado a conveniencia y prepara el input para:
        case "II": desbloquearTeclado("sendName()"); break; // para escribir el nombre del usuario
        case "VIII": desbloquearTeclado("optionWhatOrMail()"); break; // para decidir entre wpp y email
        case "IX": desbloquearTeclado("sendWhats()"); break; // par enviar numero de celu
        case "X": desbloquearTeclado("sendMail()"); break; // para enviar correo
        case "XV": desbloquearTeclado("decisionCliente()"); break; // para decidir entre estudio, contacto o salir
        case "XXI": desbloquearTeclado("decisionClienteParticular()"); break; // para decidir materia para profesor particular
        case "XXII": desbloquearTeclado("decisionClienteEstudio()"); break; // para decidir entre metodos, herramientas, motivacion y musica
        default: break; // Default no configurado
    }
}

const horaActual = () => {
    const presente = new Date(); // Obtiene la fecha actual
    let horas = presente.getHours(); // Obtiene las horas
    let minutos = presente.getMinutes(); // Obtiene los minutos

    if (horas >= 0 && horas <= 9) horas = "0" + horas; // Agrega un 0 en caso de ser digito unico
    if (minutos >= 0 && minutos <= 9) minutos = "0" + minutos; // Agrega un 0 en caso de ser digito unico

    return horas + ":" + minutos; // Retorna la hora actual de forma presentable
}

const sendName = () => {
    const nameClient = document.getElementById("readText").value; // Se obtiene el nombre introducido
    if (nameClient != "") { // Se purga si el campo es dejado en blanco
        msjCliente(nameClient); // Se imprime el mensaje del usuario

        escribirMensaje("letIV", 500, 500);
        escribirMensaje("letIII", 1500, 500);
        escribirMensaje("letXV", 2500, 750);

        _NOMBRE_CLIENTE = nameClient[0].toUpperCase() + nameClient.slice(1).toLowerCase(); // Se almacena el nombre de forma global (Para reutilizarlo)
    } else alert("Debes ingresar tu nombre si deseas continuar"); // Se purga nombre vacio
}

const decisionCliente = () => {
    const optionClient = document.getElementById("readText").value; // Se obtiene la opcion introducida
    if (optionClient != "") { // Se purga si el campo es dejado en blanco
        msjCliente(optionClient); // Se imprime el mensaje del usuario
        switch (optionClient) { // Se procesa la opcion del usuario
            case '1':
            case 'a':
            case 'A': escribirMensaje("letXXII", 500, 750); break;
            case '2':
            case 'b':
            case 'B': escribirMensaje("letVII", 500, 500); escribirMensaje("letXXIII", 1500, 500); escribirMensaje("letXXI", 2500, 750); break;
            case '3':
            case 'c':
            case 'C': opcionC(); break;
            default: clienteReDecide(); break; // En caso de introducir una opcion invalida
        }
    } else alert("Debes ingresar una opcion si deseas continuar"); // Se purga opcion vacia
}

const clienteReDecide = () => {
    // Funcion para reintroducir opciones //
    escribirMensaje("letXVI", 500, 500);
    escribirMensaje("letXV", 1500, 750);
}

const opcionA = () => {
    // Ayudas para estudiar //
    escribirMensaje("letXIV", 1500, 500);
    escribirMensaje("letXV", 2500, 750);
}

const opcionC = () => {
    // Salir del asistente //
    escribirMensaje("letVI", 500, 500);
    setTimeout(() => {
        const discon = document.createElement('p');
        discon.id = "discon";
        discon.innerHTML = "Boti se ha desconectado";
        contAssistant.appendChild(discon);
        fixScroll();
    }, 2000);
}

const decisionClienteEstudio = () => {
    const optionClient = document.getElementById("readText").value; // Se obtiene la opcion introducida
    if (optionClient != "") { // Se purga si el campo es dejado en blanco
        msjCliente(optionClient); // Se imprime el mensaje del usuario
        switch (optionClient) { // Se procesa la opcion del usuario
            case '1':
            case 'a':
            case 'A': escribirMensaje("letXVII", 500, 750); escribirMensaje("letXV", 2500, 750); break; // Metodos de estudio
            case '2':
            case 'b':
            case 'B': escribirMensaje("letXVIII", 500, 750); escribirMensaje("letXV", 2500, 750); break; // Herramientas de estudio
            case '3':
            case 'c':
            case 'C': escribirMensaje("letXIX", 500, 750); escribirMensaje("letXV", 2500, 750); break; // Motivacion para estudiar
            case '4':
            case 'd':
            case 'D': escribirMensaje("letXX", 500, 750);; escribirMensaje("letXV", 2500, 750); break; // Musica para concentrarse
            case '5':
            case 'e':
            case 'E': escribirMensaje("letXV", 500, 750); break; // Volver al menu
            default: clienteReDecideEstudio(); break; // En caso de introducir una opcion invalida
        }
    } else alert("Debes ingresar una opcion si deseas continuar"); // Se purga opcion vacia
}

const clienteReDecideEstudio = () => {
    // Funcion para reintroducir opciones //
    escribirMensaje("letXVI", 500, 500);
    escribirMensaje("letXXII", 1500, 750);
}

const decisionClienteParticular = () => {
    const optionClient = document.getElementById("readText").value; // Se obtiene la opcion introducida
    if (optionClient != "") { // Se purga si el campo es dejado en blanco
        msjCliente(optionClient); // Se imprime el mensaje del usuario
        switch (optionClient) { // Se procesa la opcion del usuario
            case '1':
            case 'a':
            case 'A': // Ciudadania
            case '2':
            case 'b':
            case 'B': //  Fisica
            case '3':
            case 'c':
            case 'C': // Geografi­a
            case '4':
            case 'd':
            case 'D': // Historia
            case '5':
            case 'e':
            case 'E': // Ingles
            case '6':
            case 'f':
            case 'F': // Lengua
            case '7':
            case 'g':
            case 'G': escribirMensaje("letV", 500, 500); escribirMensaje("letVIII", 1500, 750); break; // MatemÃ¡tica
            case '8':
            case 'h':
            case 'H': escribirMensaje("letXV", 500, 750); break; // Volver
            default: clienteReDecideParticular(); break; // En caso de introducir una opcion invalida
        }
    } else alert("Debes ingresar una opcion si deseas continuar"); // Se purga opcion vacia
}

const clienteReDecideParticular = () => {
    // Funcion para reintroducir opciones //
    escribirMensaje("letXVI", 500, 500);
    escribirMensaje("letXXI", 1500, 750);
}

const optionWhatOrMail = () => {
    const optionClient = document.getElementById("readText").value; // Se obtiene la opcion introducida
    if (optionClient != "") { // Se purga si el campo es dejado en blanco
        msjCliente(optionClient); // Se imprime el mensaje del usuario
        switch (optionClient) { // Se procesa la opcion del usuario
            case '1':
            case 'a':
            case 'A': escribirMensaje("letIX", 500, 500); break;
            case '2':
            case 'b':
            case 'B': escribirMensaje("letX", 500, 500); break;
            default: optionReWhatOrMail(); break; // En caso de introducir una opcion invalida
        }
    } else alert("Debes ingresar una opcion si deseas continuar"); // Se purga opcion vacia
}

const optionReWhatOrMail = () => {
    // Funcion para reintroducir opciones //
    escribirMensaje("letXVI", 500, 500);
    escribirMensaje("letVIII", 1500, 750);
}

const sendWhats = () => {
    const dato = document.getElementById('readText').value; // Se obtiene el numero de telefono ingresado
    if (dato != "") { // Se filtra si el campo es dejado en blanco
        if (dato.length == 10) { // Se filtra numero con la cantidad correspondiente
            for (let i = 0; i < dato.length; i++) { // Se analizan todos los caracteres
                if (dato.charCodeAt(i) > 47 && dato.charCodeAt(i) < 58) { // Filtra que los caracteres sean entre 0 y 9
                    bloquearTeclado(); // Se bloquea el teclado
                    msjCliente(dato); // Se imprime el numero ingresado
                    escribirMensaje("letXIII", 500, 500);
                    escribirMensaje("letXIV", 1500, 750);
                    escribirMensaje("letXV", 2500, 750);
                    break;
                } else {
                    bloquearTeclado();
                    msjCliente(dato);
                    sendReWhats(); // En caso de que el numero sea invalido
                }
            }
        } else {
            bloquearTeclado();
            msjCliente(dato);
            sendReWhats();
        }
    } else alert("Debes ingresar un numero si deseas continuar"); // Se filtra si el campo es dejado en blanco
}

const sendReWhats = () => {
    // Funcion para reintroducir opciones //
    escribirMensaje("letXI", 500, 500);
    escribirMensaje("letIX", 1500, 750);
}

const sendMail = () => {
    let check = false; // Check de verificar el correo
    const dato = document.getElementById('readText').value; // Se obtiene el correo introducido

    if (dato != "") { // Se filtra si es dejado en blanco
        for (let x = 0; x < dato.length; x++) { // Se analiza todos los caracteres
            if (dato.charCodeAt(x) == 64) { // Busca un arroba (@)
                for (let y = x; y < dato.length; y++) { // Analiza los caracteres restantes
                    if (dato.charCodeAt(y) == 46) { // Busca un punto (.)
                        check = true; break; // Una vez encontrados el @ y el . el mail se da como valido 
                    }
                }
            }
        }
        bloquearTeclado(); // Se bloquea el teclado una vez ingresado el correo
        msjCliente(dato); // Se imprime en pantalla el correo

        if (check) {
            escribirMensaje("letXIII", 500, 500);
            escribirMensaje("letXIV", 1500, 750);
            escribirMensaje("letXV", 2500, 750);
        } else sendReMail(); // En caso de enviar una opcion invalida
    } else alert("Debes ingresar un correo si deseas continuar"); // Se filtra campo en blanco
}

const sendReMail = () => {
    // Funcion para reintroducir opciones //
    escribirMensaje("letXII", 500, 500);
    escribirMensaje("letX", 1500, 750);
}

// # Esto lo guardo para saber como generar la interfaz de opciones # //
// function decisiones() {
//    let decision = document.createElement('div');
//    decision.setAttribute("class", "decision");
//    let optionI = document.createElement("div");
//    optionI.setAttribute("class", "option");
//    optionI.setAttribute("id", "optionIII-I");
//    optionI.setAttribute("onclick", "selectOptI()");
// }

// # Esto lo guardo porque me parecio interesante # //
/* function envioDatos() {
   let nombre = _NOMBRE_CLIENTE;
   let destino = document.getElementById("letMail").innerHTML;
   let datos = document.getElementById("datosCliente").innerHTML;
   let letPregunta = document.getElementById("letVII").innerHTML;
   let rsptDeCliente = document.getElementById("rsptDeCliente").innerHTML;
   let letPreguntaOpciones = document.getElementById("letVIII").innerHTML;
   let letOpcionI = document.getElementById("letIX").innerHTML;
   let letOpcionII = document.getElementById("letX").innerHTML;
   let letOpcionIII = document.getElementById("letXI").innerHTML;
   if (optionSelect == 1) optionSelect = letOpcionI;
   if (optionSelect == 2) optionSelect = letOpcionII;
   if (optionSelect == 3) optionSelect = letOpcionIII;
   let param = {
      destino: destino,
      nombre: nombre,
      datos: datos,
      preguntaInteres: letPregunta,
      rsptaInteres: rsptDeCliente,
      preguntaOpciones: letPreguntaOpciones,
      opcionSelect: optionSelect
   } $.ajax({
      data: param,
      url: "envioMail/contacto.php",
      method: "post",
      success: data=>{}
   }) $.ajax({
      data: param,
      url: "envioMail/enviar.php",
      method: "post",
      success: data=>{}
   }) $.ajax({url: "basicConfig.php",success: data=>{}});
}*/