async function obtenerPuntos() {
    let response = await fetch("http://localhost:4000/puntaje", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const datos = await response.json();
    return datos;
}

async function llenarTabla() {
    let datos = await obtenerPuntos();
    
    if (!datos.ok) {
        console.log("No se pudo obtener el ranking");
        return;
    }

    let puntos = datos.puntos;

    let tabla = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Puntaje</th>
        </tr>`;

    try {
        for (let i = 0; i < puntos.length; i++) {
            let punto = puntos[i];
            tabla += `
            <tr>
                <td style="text-align:center">${punto.ID}</td>
                <td style="text-align:center">${punto.nombre}</td>
                <td style="text-align:center">${punto.puntaje}</td>
            </tr>`;
        }
        document.getElementById("tabla").innerHTML = tabla;
    } catch (error) {
        console.error("Error", error);
    }
}

llenarTabla();


/*
async function mostrarRanking() {
    try {
        const response = await fetch("http://localhost:4000/puntaje");
        const data = await response.json();

        if (data.ok) {
            let tablaBody = document.getElementById("tablaRanking").querySelector("tbody");
            tablaBody.innerHTML = ""; // Limpiar contenido previo

            for (let i = 0; i < data.puntaje.length; i++) {
                let filaHTML = "<tr>" +
                    "<td>" + data.puntaje[i].nombre + "</td>" +
                    "<td>" + data.puntaje[i].puntaje + "</td>" +
                    "</tr>";

                tablaBody.innerHTML += filaHTML;
            }
        } else {
            console.log("No hay puntajes para mostrar.");
        }

    } catch (error) {
        console.error("Error al obtener puntajes:", error);
    }
}

window.onload = () => {
    mostrarRanking();
};
*/


