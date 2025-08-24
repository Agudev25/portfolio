// Reiniciar juego al pulsar el botón
document.getElementById("inicio").addEventListener("click", () => {
  // Reiniciar estado de todos los alimentos
  alimentos.forEach((alimento) => {
    alimento.mostrado = false;
  });

  // Ocultar todas las pegatinas
  document
    .querySelectorAll(".pegatinas img, .pegatinas1 img")
    .forEach((img) => {
      img.style.display = "none";
    });

  let nombremostrado = document.getElementById("muestranombre");
  nombremostrado.className = "hidden";
  // Limpiar el alimento actual
  document.getElementById("alimento").innerHTML = "";

  // Actualizar contador
  actualizarContador();

  // Mostrar el primer alimento
  mostrarSiguienteAlimento();
});

document.getElementById("nombre").addEventListener("click", () => {
  const nombremostrado = document.getElementById("muestranombre");
  const n = prompt("Introducir nombre");

  if (n && n.trim() !== "") {
    nombremostrado.innerHTML = `
      <h2 class = "mt-3">Estamos jugando con:</h2>
      <h1 class = "nombre">${n.trim()}</h1>
    `;
    nombremostrado.className = ""; // Mostrar div
  } else {
    nombremostrado.innerHTML = ""; // Limpiar contenido
    nombremostrado.className = "hidden"; // Ocultar div
  }
});

// Almacenamos el grupo del alimento arrastrado
let grupoAlimentoArrastrado = null;

// Delegamos evento cuando se añade el alimento
document.addEventListener("dragstart", (event) => {
  const img = event.target;
  if (img.id === "alimento-actual") {
    grupoAlimentoArrastrado = parseInt(img.dataset.grupo);
    event.dataTransfer.setData("text/plain", "alimento");
  }
});

// Habilitamos soltar sobre las zonas
document.querySelectorAll(".zona").forEach((zona) => {
  zona.addEventListener("dragover", (event) => {
    event.preventDefault(); // Necesario para permitir el drop
  });

  zona.addEventListener("drop", (event) => {
    event.preventDefault();
    const grupoZona = parseInt(zona.getAttribute("grupo"));
    const img = document.getElementById("alimento-actual");
    if (!img) return;

    const grupoAlimento = parseInt(img.dataset.grupo);

    if (grupoAlimento === grupoZona) {
      // ✅ Acierto: mostrar pegatina previamente generada
      const alimento = alimentos.find(
        (a) => a.imagen === img.getAttribute("src")
      );
      if (alimento) {
        const pegatina = document.getElementById(`pegatina-${alimento.id}`);
        if (pegatina) {
          pegatina.style.display = "inline-block";
          pegatina.classList.add("colocado");
        }
        alimento.mostrado = true; // Solo marcar como mostrado si acierta
      }

      //alert("✅ ¡Correcto!");
      //mostrarAcierto();
      //mostrarFuegosArtificiales();
      aleatorio(1);

      document.getElementById("alimento").innerHTML = "";
      actualizarContador();
      mostrarSiguienteAlimento();
    } else {
      //alert("❌ Intenta de nuevo.");
      aleatorio(0);
    }

    grupoAlimentoArrastrado = null;
  });
});

// Actualizar contador
function actualizarContador() {
  const noMostrados = alimentos.filter((alimento) => !alimento.mostrado);
  const contador = document.getElementById("contador-restantes");
  contador.textContent = `${noMostrados.length}`;
}

// Generar pegatinas ocultas
function generarPegatinas() {
  alimentos.forEach((alimento) => {
    const zona = document.querySelector(
      `#zona-${alimento.grupo} .pegatinas, #zona-${alimento.grupo} .pegatinas1`
    );
    if (!zona) return;

    const img = document.createElement("img");
    img.id = `pegatina-${alimento.id}`;
    img.src = alimento.imagen;
    img.alt = alimento.nombre;
    img.style.display = "none";

    zona.appendChild(img);
  });
}

// Mostrar un alimento aleatorio
function mostrarSiguienteAlimento() {
  const noMostrados = alimentos.filter((a) => !a.mostrado);
  if (noMostrados.length > 0) {
    const siguiente =
      noMostrados[Math.floor(Math.random() * noMostrados.length)];
    const contenedor = document.getElementById("alimento");
    contenedor.innerHTML = `
      <div style="text-align: center;">
        <img src="${siguiente.imagen}" alt="${siguiente.nombre}" 
             data-grupo="${siguiente.grupo}" draggable="true" id="alimento-actual" />
        <div class = "nombreAlimento">
          ${siguiente.nombre}
        </div>
      </div>
    `;
  } else {
    alert("🎉 ¡Has completado todos los alimentos!");
    document.getElementById("alimento").innerHTML = "";
  }
}

// Inicialización
generarPegatinas();
actualizarContador();

// ----- SOPORTE PARA TÁCTIL -----
const alimentoDiv = document.getElementById("alimento");
let alimentoMovil = null;

document.addEventListener("touchstart", (event) => {
  const img = event.target;
  if (img.id === "alimento-actual") {
    alimentoMovil = img;
  }
});

document.addEventListener("touchmove", (event) => {
  if (!alimentoMovil) return;

  const touch = event.touches[0];
  alimentoMovil.style.position = "absolute";
  alimentoMovil.style.left = `${touch.pageX - 50}px`;
  alimentoMovil.style.top = `${touch.pageY - 50}px`;
  alimentoMovil.style.zIndex = 1000;
});

document.addEventListener("touchend", (event) => {
  if (!alimentoMovil) return;

  const touch = event.changedTouches[0];
  const zonas = document.querySelectorAll(".zona");
  let soltadoEnZona = false;

  zonas.forEach((zona) => {
    const rect = zona.getBoundingClientRect();
    if (
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom
    ) {
      // Simulamos el drop
      zona.dispatchEvent(new Event("drop", { bubbles: true }));
      soltadoEnZona = true;
    }
  });

  // Reset estilo
  alimentoMovil.style.position = "";
  alimentoMovil.style.left = "";
  alimentoMovil.style.top = "";
  alimentoMovil.style.zIndex = "";

  alimentoMovil = null;
});
