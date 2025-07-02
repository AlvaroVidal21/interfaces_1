
// Creamos las clases

class ModuloBionico {
    constructor(nombre, codigo, costo, parte, descripcion){
        this.nombre = nombre;
        this.codigo = codigo;
        this.costo = costo;
        this.parte = parte;
        this.descripcion = descripcion;

    }
};


class Compra {
  constructor(modulo, alias, banco, email) {
    this.modulo = modulo;
    this.alias = alias;
    this.banco = banco;
    this.email = email;
  }

  renderFila() {
    return `
      <tr>
        <td>${this.modulo.nombre}</td>
        <td>${this.modulo.codigo}</td>
        <td>${this.modulo.costo} CP</td>
        <td><button class="btn-eliminar">🗑️</button></td>
      </tr>
    `;
  }
}


const btnConfirmar = document.getElementById("btn-confirmar");
const inputAlias = document.getElementById("alias");
const inputBanco = document.getElementById("banco");    
const inputEmail = document.getElementById("email");
const tablaCompras = document.getElementById("tabla-compras").querySelector("tbody");
const spanCostoTotal = document.getElementById("costo-total");
const compras = [];


btnConfirmar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!moduloSeleccionado) {
        alert("Selecciona un módulo del carrusel primero.");
        return;
    }


    const alias = inputAlias.value.trim();
    const banco = inputBanco.value.trim();
    const email = inputEmail.value.trim();

    // Validamos los datos
    if (!alias || !banco || !email) {
        alert ("Todos los campos son obligatorios.");
        return;
    }

    // Creamos instancia de compra
    const compra = new Compra(moduloSeleccionado, alias, banco, email);
    compras.push(compra);

    // Insertar fila a la tabla
    const fila = document.createElement("tr");
    fila.innerHTML = compra.renderFila();
    tablaCompras.appendChild(fila);

    actualizarCostoTotal();

    // Limpiamos el formulario
    moduloSeleccionado = null;
    inputAlias.value = "";
    inputBanco.value = "";
    inputEmail.value = "";

    // funcionalidad para eliminar la fila
    fila.querySelector(".btn-eliminar").addEventListener("click",  () => {
        fila.remove();
        const index = compras.indexOf(compra);
        if (index !== -1) {
            compras.splice(index, 1);
        }
        actualizarCostoTotal();
        alert("Compra eliminada correctamente.");
    })


})


function actualizarCostoTotal() {
    const total = compras.reduce((acc, c) => acc + c.modulo.costo, 0);
    spanCostoTotal.textContent = total;
}



