// CARRUSEL

let moduloSeleccionado = null;

// MODULOS CYBERPUNKS

const modulos = [
  {
    id: "BX-ONX-7734",
    nombre: "Óculus Nexis",
    categoria: "Ojo",
    costo: 5000,
    imagen: "../assets/img/eye.png",
    descripcion:
      "Reemplazo ocular con visión nocturna adaptativa, zoom 100x, reconocimiento facial y grabación cifrada en tiempo real.",
  },
  {
    id: "BX-SNW-1987",
    nombre: "Synapse Weaver",
    categoria: "Cerebro",
    costo: 8500,
    imagen: "../assets/img/cerebro.png",
    descripcion:
      "Interfaz neural que acelera el pensamiento, permite multitarea, netrunning pasivo y descarga de conocimientos al instante.",
  },
  {
    id: "BX-TIF-001A",
    nombre: "Titanium Fist",
    categoria: "Brazo",
    costo: 6200,
    imagen: "../assets/img/brazo.png",
    descripcion:
      "Brazo con fuerza aumentada, herramientas retráctiles, retroalimentación háptica y puerto de datos universal.",
  },
  {
    id: "BX-VLS-2049",
    nombre: "Velocity Striders",
    categoria: "Piernas",
    costo: 7800,
    imagen: "../assets/img/piernas.png",
    descripcion:
      "Piernas biónicas con propulsores, giroscopios y sistemas de salto para movilidad extrema y persecuciones urbanas.",
  },
  {
    id: "BX-ECN-0310",
    nombre: "EchoNet",
    categoria: "Oído",
    costo: 4500,
    imagen: "../assets/img/oidos.png",
    descripcion:
      "Implante auditivo con traducción en tiempo real, aislamiento de voz, detección de micrófonos y escucha inalámbrica pasiva.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.getElementById("carrusel-bionico");

  carrusel.innerHTML = "";

  modulos.forEach((modulo, index) => {
    const li = document.createElement("li");
    li.dataset.active = index === 0 ? "true" : "false";

    li.innerHTML = `
  <article>
    <h3>${modulo.nombre}</h3>
    <span class="precio">${modulo.costo} CP</span>
    <p>${modulo.descripcion}</p>
    <a href="#" class="btn-agregar" data-id="${modulo.id}"><span>Agregar módulo</span></a>
    <img src="${modulo.imagen}" alt="${modulo.nombre}">
  </article>
`;
    carrusel.appendChild(li);
  });

  document.querySelectorAll(".btn-agregar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const modPlano = modulos.find((m) => m.id === id);

      if (modPlano) {
        // Creamos la instancia del módulo y la almacenamos en variable global
        moduloSeleccionado = new ModuloBionico(
          modPlano.nombre,
          modPlano.id,
          modPlano.costo,
          modPlano.categoria,
          modPlano.descripcion
        );

        console.log("🦾 Módulo seleccionado:", moduloSeleccionado);
      }
    });
  });

  // copiado de https://x.com/jh3yy/status/1940066323658158198
  // https://codepen.io/jh3y/pen/XJWNMOO

  const items = Array.from(carrusel.querySelectorAll("li"));
  items.forEach((li, idx) => {
    li.addEventListener("click", () => {
      items.forEach((item) => (item.dataset.active = "false"));
      li.dataset.active = "true";
      const cols = items.map((_, i) => (i === idx ? "10fr" : "1fr")).join(" ");
      carrusel.style.gridTemplateColumns = cols;
    });
  });

  const initialCols = items.map((_, i) => (i === 0 ? "10fr" : "1fr")).join(" ");
  carrusel.style.gridTemplateColumns = initialCols;
});
