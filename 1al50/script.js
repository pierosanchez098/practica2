let tiempoInicio;
let cronometro;

function obtenerNumerosAleatorios(inicio, fin, exclusivos) {
  const numeros = Array.from({ length: fin - inicio + 1 }, (_, indice) => inicio + indice);

  if (exclusivos) {
    for (let i = numeros.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }
  }

  return numeros;
}

function inicializarJuego() {
  const tabla = document.getElementById("tablaJuego");
  const numerosAleatorios = obtenerNumerosAleatorios(1, 25, true);
  let indiceActual = 0;

  for (let i = 0; i < 5; i++) {
    const fila = tabla.insertRow();
    for (let j = 0; j < 5; j++) {
      const celda = fila.insertCell();
      celda.textContent = numerosAleatorios[indiceActual];
      celda.addEventListener("click", () => manejarClicEnCelda(celda));
      indiceActual++;
    }
  }
}

function manejarClicEnCelda(celda) {
    if (numeroActual === 0) {
      tiempoInicio = new Date();
      iniciarCronometro();
    }
  
    const numeroCelda = parseInt(celda.textContent);
  
    if (numeroCelda === numeroActual + 1) {
      celda.style.backgroundColor = "lightgray";
      celda.textContent = "";
      numeroActual++;
  
      if (numeroActual === 50) {
        detenerCronometro();
        tiempoFinal = obtenerTiempoTranscurrido();
        alert(`Has completado el juego en ${tiempoFinal} segundos.`);
        reiniciarJuego();
      } else {
        if (numeroCelda <= 25) {
          reemplazarCeldaVacia();
        } else {
          ocultarCelda(celda);
        }
      }
    }
  }

function reemplazarCeldaVacia() {
  const tabla = document.getElementById("tablaJuego");
  const celdasVacias = Array.from(tabla.querySelectorAll("td:empty"));

  if (celdasVacias.length > 0) {
    const numerosExcluidos = Array.from(tabla.querySelectorAll("td:not(:empty)")).map(c => parseInt(c.textContent));
    const nuevoNumero = obtenerNumerosAleatorios(26, 50, true).find(num => !numerosExcluidos.includes(num));
    celdasVacias[0].textContent = nuevoNumero;
  }
}

function ocultarCelda(celda) {
  celda.style.visibility = "hidden";
}

function iniciarCronometro() {
  cronometro = setInterval(actualizarTiempo, 1000);
}

function detenerCronometro() {
  clearInterval(cronometro);
}

function actualizarTiempo() {
    const tiempoActual = new Date();
    const tiempoTranscurrido = new Date(tiempoActual - tiempoInicio);
    const minutos = tiempoTranscurrido.getMinutes().toString().padStart(2, '0');
    const segundos = tiempoTranscurrido.getSeconds().toString().padStart(2, '0');
    const milisegundos = tiempoTranscurrido.getMilliseconds().toString().padStart(3, '0');
    document.getElementById("cronometro").textContent = `Tiempo: ${minutos}:${segundos}:${milisegundos}`;
  }

function reiniciarJuego() {
  const tabla = document.getElementById("tablaJuego");
  tabla.innerHTML = "";
  numeroActual = 0;
  document.getElementById("cronometro").textContent = "Tiempo: 00:00";
  inicializarJuego();
}

function obtenerTiempoTranscurrido() {
    const tiempoActual = new Date();
    const tiempoTranscurrido = new Date(tiempoActual - tiempoInicio);
    return tiempoTranscurrido.getSeconds() + "." + tiempoTranscurrido.getMilliseconds().toString().padStart(3, '0');
  }

let numeroActual = 0;
inicializarJuego();

