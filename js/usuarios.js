let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

/* =========================
    REGISTRAR USUARIO
========================= */

function registrarUsuario() {

    let nombre = document.getElementById("nombre").value.trim();
    let documento = document.getElementById("documento").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let placa = document.getElementById("placa").value.trim();

    // VALIDACIÓN
    if (!nombre || !documento || !telefono || !placa) {
        alert("Por favor completa todos los campos");
        return;
    }

    // VALIDAR PLACA REPETIDA
    let existe = usuarios.some(u => u.placa === placa);

    if (existe) {
        alert("Esta placa ya está registrada");
        return;
    }

    let usuario = {
        nombre,
        documento,
        telefono,
        placa,
    };

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarUsuarios();
    limpiarFormulario();
}

/* =========================
    MOSTRAR USUARIOS
========================= */

function mostrarUsuarios() {

    let tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    usuarios.forEach((u, index) => {

        tabla.innerHTML += ` 
        <tr>
            <td>${u.nombre}</td>
            <td>${u.documento}</td>
            <td>${u.telefono}</td>
            <td>${u.placa}</td>

            <td>
                <button onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

/* =========================
    ELIMINAR USUARIO
========================= */

function eliminarUsuario(index) {

    let confirmar = confirm("¿Eliminar este usuario?");

    if (confirmar) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarUsuarios();
    }
}

/* =========================
    LIMPIAR FORMULARIO
========================= */

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("placa").value = "";
}

/* =========================
    INICIO
========================= */

mostrarUsuarios();