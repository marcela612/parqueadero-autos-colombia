let celdas = JSON.parse(localStorage.getItem("celdas")) || [];

/* =========================
   REGISTRAR CELDA
========================= */

function registrarCelda() {

    let numero = document.getElementById("numeroCelda").value.trim();

    if (!numero) {
        alert("Ingresa un número de celda");
        return;
    }

    // VALIDAR CELDA REPETIDA
    let existe = celdas.some(c => c.numero === numero);

    if (existe) {
        alert("Esta celda ya existe");
        return;
    }

    let celda = {
        numero,
        estado: "Disponible",
    };

    celdas.push(celda);

    localStorage.setItem("celdas", JSON.stringify(celdas));

    mostrarCeldas();
    limpiarInput();
}

/* =========================
   MOSTRAR CELDAS
========================= */

function mostrarCeldas() {

    let tabla = document.getElementById("tablaCeldas");

    tabla.innerHTML = "";

    celdas.forEach((celda, index) => {

        let colorEstado = celda.estado === "Disponible" ? "green" : "red";

        tabla.innerHTML += `
        <tr>
            <td>${celda.numero}</td>

            <td style="color:${colorEstado}; font-weight:bold;">
                ${celda.estado}
            </td>

            <td>
                <button onclick="ocuparCelda(${index})">Ocupar</button>
                <button onclick="liberarCelda(${index})">Liberar</button>
                <button onclick="eliminarCelda(${index})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

/* =========================
   OCUPAR CELDA
========================= */

function ocuparCelda(index) {

    if (celdas[index].estado === "Ocupada") {
        alert("La celda ya está ocupada");
        return;
    }

    celdas[index].estado = "Ocupada";

    localStorage.setItem("celdas", JSON.stringify(celdas));

    mostrarCeldas();
}

/* =========================
   LIBERAR CELDA
========================= */

function liberarCelda(index) {

    if (celdas[index].estado === "Disponible") {
        alert("La celda ya está libre");
        return;
    }

    celdas[index].estado = "Disponible";

    localStorage.setItem("celdas", JSON.stringify(celdas));

    mostrarCeldas();
}

/* =========================
   ELIMINAR CELDA
========================= */

function eliminarCelda(index) {

    let confirmar = confirm("¿Eliminar esta celda?");

    if (confirmar) {
        celdas.splice(index, 1);
        localStorage.setItem("celdas", JSON.stringify(celdas));
        mostrarCeldas();
    }
}

/* =========================
   LIMPIAR INPUT
========================= */

function limpiarInput() {
    document.getElementById("numeroCelda").value = "";
}

/* =========================
   INICIO
========================= */

mostrarCeldas();