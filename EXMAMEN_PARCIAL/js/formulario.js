// 1. Clase que representa un módulo biónico
class ModuloBionico {
  constructor(nombre, id, costo, parte, descripcion) {
    this.nombre = nombre;
    this.id = id;
    this.costo = costo;
    this.parte = parte;
    this.descripcion = descripcion;
  }
}

// 2. Clase que representa una compra (solo si la necesitas más adelante)
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
        <td>${this.modulo.id}</td>
        <td>${this.modulo.costo} CP</td>
        <td><button class="btn-eliminar">🗑️</button></td>
      </tr>
    `;
  }
}

// 3. Validación al confirmar compra (solo verifica, no agrega filas)
document.addEventListener("DOMContentLoaded", () => {
  const btnConfirmar = document.getElementById("btn-confirmar");
  const inputAlias = document.getElementById("alias");
  const inputBanco = document.getElementById("banco");
  const inputEmail = document.getElementById("email");
  const tablaBody = document.querySelector("#tabla-compras tbody");

  btnConfirmar.addEventListener("click", (e) => {
    e.preventDefault();

    // Verifica que haya al menos un módulo en la tabla
    if (tablaBody.children.length === 0) {
      alert("Primero agrega al menos un módulo.");
      return;
    }
    // Valida formulario
    const alias = inputAlias.value.trim();
    const banco = inputBanco.value.trim();
    const email = inputEmail.value.trim();
    if (!alias || !banco || !email) {
      alert("Completa todos los campos.");
      return;
    }

    // Confirmación final
    alert(`✅ Compra confirmada por ${alias}. ¡Gracias por usar BIONEXUS!`);

    // (Opcional) limpiar tabla y formulario
    // tablaBody.innerHTML = "";
    inputAlias.value = "";
    inputBanco.value = "";
    inputEmail.value = "";
  });
});