function obtenerVehiculos() {
    return JSON.parse(localStorage.getItem('vehiculos')) || [];
}

function guardarVehiculos(lista) {
    localStorage.setItem('vehiculos', JSON.stringify(lista));
}

function registrarEntrada() {

    let placa = document.getElementById("placa").value;
    let usuario = document.getElementById("usuario").value;
    let celda = document.getElementById("celda").value;

    if (!placa || !usuario || !celda) {
        alert("Complete todos los campos");
        return;
    }

    let vehiculos = obtenerVehiculos();

    // VALIDAR PLACA REPETIDA
    let placaExiste = vehiculos.find(v => v.placa === placa && v.estado === "Dentro");

    if (placaExiste) {
        alert("Esta placa ya está dentro del parqueadero");
        return;
    }

    // VALIDAR CELDA OCUPADA
    let celdaOcupada = vehiculos.find(v => v.celda === celda && v.estado === "Dentro");

    if (celdaOcupada) {
        alert("Celda ocupada");
        return;
    }

    let nuevo = {
        placa: placa,
        usuario: usuario,
        celda: celda,
        horaEntrada: new Date().toLocaleTimeString(),
        horaSalida: "",
        estado: "Dentro"
    };

    vehiculos.push(nuevo);

    guardarVehiculos(vehiculos);

    alert("Entrada registrada");

    document.getElementById("placa").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("celda").value = "";
}

function registrarSalida() {

    let placa = document.getElementById("placaSalida").value;
    let vehiculos = obtenerVehiculos();

    let encontrado = false;

    vehiculos.forEach(v => {
        if (v.placa === placa && v.estado === "Dentro") {
            v.estado = "Fuera";
            v.horaSalida = new Date().toLocaleTimeString(); // ⭐ FALTABA ESTO
            encontrado = true;
        }
    });

    guardarVehiculos(vehiculos);

    if (encontrado) {
        alert("Salida registrada");
    } else {
        alert("Vehículo no encontrado");
    }
}

function mostrarVehiculos() {

    let vehiculos = obtenerVehiculos();
    let tabla = document.getElementById("tablaVehiculos");

    if (!tabla) return;

    tabla.innerHTML = "";

    vehiculos.forEach(v => {

        tabla.innerHTML += `
        <tr>
            <td>${v.placa}</td>
            <td>${v.usuario}</td>
            <td>${v.celda}</td>
            <td>${v.horaEntrada || "N/A"}</td>
            <td>${v.horaSalida || "N/A"}</td>
            <td>${v.estado}</td>
        </tr>
        `;
    });
}