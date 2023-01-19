class Games {
  static GenearaNuevoPatron() {
    const colores = ["blue", "green", "yellow", "red"];
    const numAzar = Math.random() * colores.length;

    return colores[Math.floor(numAzar)];
  }

  static verificaPatron(juego, jugador) {
    let isTrue = true;

    let i = 0;
    while (isTrue && i < juego.length) {
      isTrue = juego[i] == jugador[i];
      i++;
    }

    return isTrue;
  }
}

export default Games;
