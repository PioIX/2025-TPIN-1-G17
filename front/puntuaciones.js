async function obtenerPuntos() {
    let response = await fetch("http://localhost:4000/puntaje", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const puntos = response.json();
    return puntos;
}

async function llenarTabla() {
    let puntos = await obtenerPuntos();
    let tabla = `
        <tr>
            <th>ID</th>
            <th>nombre</th>
            <th>puntaje</th>
        </tr>`

    try {
        for (let i = 0; i < puntos.length; i++) {
            let punto = puntos[i];
            tabla += `
            <tr>
                <td>${punto.ID}</td>
                <td>${punto.nombre}</td>
                <td>${punto.puntaje}</td>
                
            </tr>`
        }
        document.getElementById("tabla").innerHTML = tabla;
    } catch (error) {
        console.error("Error", error);
    }
    
}


