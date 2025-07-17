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