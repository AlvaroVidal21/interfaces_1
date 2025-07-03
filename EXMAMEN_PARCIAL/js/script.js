// 0. Mantén esto al tope si no lo tenías
let moduloSeleccionado = null;
let totalCP = 0;

// 1. Función para actualizar el mostrador del total
function updateTotal() {
  const totalSpan = document.getElementById("costo-total");
  totalSpan.textContent = totalCP;
}

// 2. Función central para agregar filas a la tabla Y actualizar total
function agregarModuloATabla(modulo) {
  const tablaBody = document.querySelector("#tabla-compras tbody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${modulo.nombre}</td>
    <td>${modulo.id}</td>
    <td>${modulo.costo} CP</td>
    <td><button class="btn-eliminar">🗑️</button></td>
  `;
  tablaBody.appendChild(fila);

  // ➕ Incrementar total y refrescar display
  totalCP += modulo.costo;
  updateTotal();

  // 3. Botón eliminar: resta del total y quita la fila
  fila.querySelector(".btn-eliminar").addEventListener("click", () => {
    totalCP -= modulo.costo;
    updateTotal();
    fila.remove();
  });
}

// 4. Catálogo plano de módulos
const modulos = [
  { id: "BX-ONX-7734", nombre: "Óculus Nexis", costo: 5000, categoria: "Ojo", descripcion: "Visión nocturna, zoom 100x, reconocimiento facial..." },
  { id: "BX-SNW-1987", nombre: "Synapse Weaver", costo: 8500, categoria: "Cerebro", descripcion: "Procesamiento cognitivo y conexión a la red neuronal..." },
  { id: "BX-TIF-001A", nombre: "Titanium Fist", costo: 6200, categoria: "Brazo", descripcion: "Fuerza aumentada, herramientas retráctiles..." },
  { id: "BX-VLS-2049", nombre: "Velocity Striders", costo: 7800, categoria: "Piernas", descripcion: "Velocidad extrema, micropropulsores, equilibrio giroscópico..." },
  { id: "BX-ECN-0310", nombre: "EchoNet", costo: 4500, categoria: "Oido", descripcion: "Audición aumentada, análisis de audio, traducción en tiempo real..." }
];

// 5. Renderizado de carrusel y enlazado de botones
document.addEventListener("DOMContentLoaded", () => {
  // OJO: Carrusel es el <ul> de mi html! <===== ¡IMPORTANTE!
  const carrusel = document.getElementById("carrusel-bionico");
  carrusel.innerHTML = ""; // Limpiar el carrusel
  // Recorremos el array de modulos:
  modulos.forEach(modPlano => {
    const li = document.createElement("li"); // Se crea un  elemento li
    // Se inserta el contenido HTML dentro del li 
    li.innerHTML = `
      <article>
        <h3>${modPlano.nombre}</h3>
        <p>${modPlano.descripcion}</p>
        <a href="#" class="btn-agregar" data-id="${modPlano.id}">
          <span>Agregar módulo</span>
        </a>
        <img src="assets/img/${modPlano.categoria.toLowerCase()}.png" alt="${modPlano.nombre}">
      </article>
    `;
    carrusel.appendChild(li);
  });

  // Carrusel dinámico (efecto expandir/colapsar)
  const items = Array.from(carrusel.querySelectorAll("li")); // Convierte los li en un array manipulable
  items.forEach((li, idx) => {
    li.addEventListener("click", () => {
      items.forEach(i => i.dataset.active = "false");
      li.dataset.active = "true";
      const cols = items.map((_, i) => i === idx ? "10fr" : "1fr").join(" ");
      carrusel.style.gridTemplateColumns = cols;
    });
  });
  carrusel.style.gridTemplateColumns = items.map((_, i) => i === 0 ? "10fr" : "1fr").join(" ");

  // 6. Enlazar cada botón "Agregar módulo" para añadir a la tabla
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const id = btn.dataset.id;
      const modPlano = modulos.find(m => m.id === id);
      if (!modPlano) return;

      // Instanciamos y agregamos en la tabla + total
      moduloSeleccionado = new ModuloBionico(
        modPlano.nombre,
        modPlano.id,
        modPlano.costo,
        modPlano.categoria,
        modPlano.descripcion
      );
      agregarModuloATabla(moduloSeleccionado);
    });
  });

  // 7. Inicializamos el total en 0
  updateTotal();
});