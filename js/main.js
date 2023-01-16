import "../assets/css/style.scss";
import Games from "./modules/games.js";

let inicio = false;
let level = 0;
let patronJuego = [];
let patronJugador = [];

///click a boton play
$("#play").click(function () {
  primerNivel();
});

///click a cualquier tecla
$(document).keypress(function (e) {
  if (!inicio) {
    primerNivel();
  }
});

//detecta a que color se le hace click y verifica el patron
$(".contenedor__row__bloque").click(function (e) {
  let click = this.id;
  mostrarPatron(click);
  patronJugador.push(click);
  if (
    patronJugador.length == patronJuego.length &&
    patronJugador.length <= patronJuego.length
  ) {
    let sigue = Games.verificaPatron(patronJuego, patronJugador);
    if (sigue) {
      patronJugador = [];
      setTimeout(() => {
        siguiente();
      }, 1000);
    } else {
      perdio();
    }
  }
});

//si desea volver a jugar
$("#check").click(function () {
  reiniciar();
});

//si desea regresar al inicio
$("#home").click(function () {
  regresarInicio();
});

//se llama solo para cuando empieza el nivel, para quitar el modal e iniciar juego
function primerNivel() {
  inicio = true;
  $("#modal").fadeOut();
  siguiente();
}

//muestra los click y sus respectivos sonidos
function mostrarPatron(color) {
  const sound = new Audio(`assets/sound/${color}.mp3`);
  sound.play();
  $(`#${color}`).addClass("click");
  setTimeout(() => {
    $(`#${color}`).removeClass("click");
  }, 500);
}

//cambia de nivel
function siguiente() {
  level++;
  let patron = Games.GenearaNuevoPatron();
  mostrarTexto(level);
  patronJuego.push(patron);
  mostrarPatron(patron);
}

//si el jugador pierde muestra modal de game over y llama a funcion para reiniciar variables
function perdio() {
  const audio = new Audio("assets/sound/wrong.mp3");
  audio.play();
  $("#modal__gameOver").css("display", "flex");
  $("#modal__gameOver").fadeIn();
  reset();
}

//si da click a boton inicio muestra el modal inicial y quita el modal de game over
function regresarInicio() {
  $("#modal__gameOver").css("display", "none");
  $("#modal__gameOver").fadeOut();
  $("#modal").fadeIn();
  mostrarTexto(level);
}

//si da click a boton reiniciar quita el modal game over y lo manda al primer nivel
function reiniciar() {
  $("#modal__gameOver").css("display", "none");
  $("#modal__gameOver").fadeOut();
  siguiente();
}

//muestra texto del nivel
function mostrarTexto(level) {
  if (level == 0) {
    $(".level").text("");
  } else {
    $(".level").text("Level " + level);
  }
}

//restablece los valores de las variables al inicial
function reset() {
  inicio = false;
  level = 0;
  patronJuego = [];
  patronJugador = [];
}
