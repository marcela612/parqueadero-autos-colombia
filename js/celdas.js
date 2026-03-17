let celdas = JSON.parse(localStorage.getItem("celdas")) || [];

function registrarCelda() {

    let numero = document.getElementById("numeroCelda").value;

    let celda = {

        numero,
        estado: "Disponible",
    };

    celdas.push(celda);

    localStorage.setItem("celdas", JSON.stringify(celdas));

    mostrarCeldas();

}

function mostrarCeldas() {

    let tabla = document.getElementById("tablaCeldas");

    tabla.innerHTML = "";

    celdas.forEach ((celda, index)=> {

        tabla.innerHTML += `

        <tr>

        <td>${celda.numero}</td>
        <td>${celda.estado}</td>

        <td>

        <button onclick="ocuparCelda(${index})">Ocupar</button>
        <button onclick="liberarCelda(${index})">Liberar</button>

        </td>

        </tr>

        `;
    });

}

function ocuparCelda(index) {

    celdas[index].estado = "Ocupada";

    localStorage.setItem("celdas", JSON.stringify(celdas));

    mostrarCeldas();

}

function liberarCelda(index) {

    celdas[index].estado = "Disponible";

    localStorage.setItem("celdas", JSON.stringify(celdas));

    mostrarCeldas();

}

mostrarCeldas();
