let pagos = JSON.parse(localStorage.getItem("pagos")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let select = document.getElementById("usuarioPago");

// Cargar usuarios
function cargarUsuarios() {
    select.innerHTML = '<option value="">Seleccionar Usuario</option>';

    usuarios.forEach(u => {
        select.innerHTML += `<option value="${u.placa}">${u.placa} - ${u.nombre}</option>`;
    });
}

// Formatear mientras escribe (COP)
document.getElementById("valor").addEventListener("input", function (e) {
    let valor = e.target.value.replace(/\D/g, "");
    e.target.value = "$ " + Number(valor).toLocaleString("es-CO");
});

// Registrar pago
function registrarPago() {

    let usuario = select.value;
    let valorInput = document.getElementById("valor").value;
    let metodo = document.getElementById("metodo").value;

    let valor = parseInt(valorInput.replace(/\D/g, ""));

    // Validaciones
    if (!usuario || !valor || !metodo) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let pago = {
        usuario,
        valor,
        metodo,
        fecha: new Date().toLocaleDateString()
    };

    pagos.push(pago);

    localStorage.setItem("pagos", JSON.stringify(pagos));

    alert("Pago registrado correctamente");

    limpiarCampos();
    mostrarPagos();
}

    // Mostrar número de cuenta si se selecciona transferencia
let metodoSelect = document.getElementById("metodo");
let cuentaContainer = document.getElementById("cuentaContainer");

metodoSelect.addEventListener("change", function () {
    if (this.value === "Transferencia") {
        cuentaContainer.style.display = "block";
    } else {
        cuentaContainer.style.display = "none";
    }
});

// Mostrar pagos
function mostrarPagos() {

    let tabla = document.getElementById("tablaPagos");

    tabla.innerHTML = "";

    pagos.forEach((p, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${p.usuario}</td>
            <td>$ ${p.valor.toLocaleString('es-CO')}</td>
            <td>${p.metodo}</td>
            <td>${p.fecha}</td>
            <td>
                <button onclick="eliminarPago(${index})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

// Eliminar pago
function eliminarPago(index) {

    pagos.splice(index, 1);

    localStorage.setItem("pagos", JSON.stringify(pagos));

    mostrarPagos();
}

// Limpiar campos
function limpiarCampos() {
    select.value = "";
    document.getElementById("valor").value = "";
    document.getElementById("metodo").value = "";
}

// Inicializar
cargarUsuarios();
mostrarPagos();