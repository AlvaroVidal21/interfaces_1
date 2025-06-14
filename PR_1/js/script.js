

function calcular(){
    const input = document.getElementById("sueldo");
    const resultado = document.getElementById("monto_diezmo");

    const sueldo = parseFloat(input.value);


    // Validacion de datos

    if (isNaN(sueldo) || sueldo < 0) {
        resultado.textContext = "☠️ Por favor, ingrese un número válido mayor o igual a 0.";

        resultado.style.color = "#f00";
        return;
    }

    const diezmo = (sueldo *  0.10).toFixed(2);
    resultado.textContent = diezmo;

    resultado.style.color = "#0ff";

}