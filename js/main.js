import "../assets/css/style.scss";
import Games from "./modules/games.js";

let inicio = false;
let level = 0;
const patronJuego = [];
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

//detecta a que color se le hace click
$(".contenedor__row__bloque").click(function (e) {
  let click = this.id;
  mostrarPatron(click);
  patronJugador.push(click);
  if (patronJugador.length == patronJuego.length) {
    let sigue = Games.verificaPatron(patronJuego, patronJugador);
    if (sigue) {
      patronJugador = [];
      setTimeout(() => {
        siguiente();
      }, 1000);
    } else {
      alert("perdio");
    }
  }
});

function primerNivel() {
  let patron = Games.GenearaNuevoPatron();
  level++;
  mostrarTexto(level);
  $("#modal").fadeOut();
  mostrarPatron(patron);
  patronJuego.push(patron);
  inicio = true;
}

function mostrarPatron(color) {
  const sound = new Audio(`assets/sound/${color}.mp3`);
  sound.play();
  $(`#${color}`).addClass("click");
  setTimeout(() => {
    $(`#${color}`).removeClass("click");
  }, 500);
}

function siguiente() {
  level++;
  let patron = Games.GenearaNuevoPatron();
  mostrarTexto(level);
  patronJuego.push(patron);
  mostrarPatron(patron);
}

function perdio() {}

function mostrarTexto(level) {
  $(".level").text("Level " + level);
}
