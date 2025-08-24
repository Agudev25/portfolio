function mostrarAcierto() {
  const img = document.createElement("img");
  img.src = "imagenes/aplausos.png"; // Ruta de la imagen
  img.className = "animacion-acierto";
  document.body.appendChild(img);

  const audio = new Audio("audios/aplauso3segundos.mp3"); // Ruta corregida del audio
  audio.play();

  // Eliminar la animación después de 3s
  setTimeout(() => {
    img.remove();
  }, 3000);
}

function mostrarCopa() {
  const img = document.createElement("img");
  img.src = "imagenes/copa.webp";
  img.className = "animacion-acierto2";
  document.body.appendChild(img);

  const audio = new Audio("audios/bravo3segundos.mp3"); // Ruta corregida del audio
  audio.play();

  // Eliminar la animación después de 3s
  setTimeout(() => {
    img.remove();
  }, 3000);
}

function mostrarFuegosArtificiales() {
  const audio = new Audio("audios/fuegosArt3segundos.mp3");
  audio.play();

  for (let i = 0; i < 6; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";

    // Posiciones aleatorias alrededor del centro
    firework.style.top = `${35 + Math.random() * 30}%`;
    firework.style.left = `${30 + Math.random() * 40}%`;

    // Colores aleatorios
    const colores = ["yellow", "red", "blue", "lime", "orange", "pink"];
    const color = colores[Math.floor(Math.random() * colores.length)];
    firework.style.background = `radial-gradient(circle, ${color}, transparent)`;

    document.body.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 3000); // Ahora dura 3 segundos
  }
}

function mostrarConfeti() {
  const audio = new Audio("audios/kabuki4segundos.mp3");
  audio.play();

  // Lanzar confeti durante 3 segundos
  const duration = 3000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    confetti({
      particleCount: 80,
      spread: 120,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6,
      },
    });
  }, 250); // Confeti cada 250 ms

  // Detener confeti tras 3 segundos
  setTimeout(() => {
    clearInterval(interval);
  }, duration);
}

function mostrarError() {
  const img = document.createElement("img");
  img.src = "imagenes/error.jpeg"; // Ruta de la imagen
  img.className = "animacion-error";
  document.body.appendChild(img);

  const audio = new Audio("audios/error3segundos.mp3"); // Ruta corregida del audio
  audio.play();

  // Eliminar la animación después de 3s
  setTimeout(() => {
    img.remove();
  }, 3000);
}

function mostrarTemblor() {
  const body = document.body;
  body.classList.add("temblor");

  const audio = new Audio("audios/alerta3segundos.mp3");
  audio.play();

  setTimeout(() => {
    body.classList.remove("temblor");
  }, 3000);
}

function aleatorio(tipo) {
  if (tipo === 1) {
    // Opciones de acierto
    const funcionesAcierto = [
      mostrarAcierto,
      mostrarFuegosArtificiales,
      mostrarConfeti,
      mostrarCopa,
    ];
    const indice = Math.floor(Math.random() * funcionesAcierto.length);
    funcionesAcierto[indice](); // Llamar a una función aleatoria de acierto
  } else if (tipo === 0) {
    const funcionesError = [mostrarError, mostrarTemblor];
    const indice = Math.floor(Math.random() * funcionesError.length);
    funcionesError[indice]();
  } else {
    console.warn("Tipo no reconocido en aleatorio:", tipo);
  }
}
