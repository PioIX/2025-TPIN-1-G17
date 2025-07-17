let puntaje = 0;
let cantidadRespuestas = 0;
let autorCorrectoID = null;
let frasesYaSalieron = [];

async function cargarFrase() {
    try {
        if (cantidadRespuestas >= 15) {
            window.location.href = 'fin.html';
            return;
        }

        let intentos = 0;
        const maxIntentos = 50;
        let frase = null;

        while (intentos < maxIntentos) {
            const response = await fetch('http://localhost:4000/frase');
            const data = await response.json();

            if (!data.ok) {
                document.getElementById('fraseTexto').textContent = "No hay frases.";
                return;
            }
            if (!frasesYaSalieron.includes(data.frase.id)) {
                console.log(data.frase)
                frase = data.frase;
                frasesYaSalieron.push(data.frase.id)
                break;
            }

            intentos++;
        }

        if (!frase) {
            document.getElementById('fraseTexto').textContent = "Se acabaron las frases.";
            return;
        }

        autorCorrectoID = frase.autorCorrecto.ID;

        // Mostrar la frase
        document.getElementById('fraseTexto').textContent = `"${frase.contenido}"`;

        // Mezclar autores
        const opciones = [frase.autorCorrecto, frase.autorIncorrecto];
        if (Math.random() > 0.5) opciones.reverse();

        // Mostrar opción 1
        document.getElementById('nombre1').textContent = `${opciones[0].nombre} ${opciones[0].apellido}`;
        document.getElementById('img1').src = opciones[0].imagen;
        document.getElementById('opcion1').onclick = () => seleccionarAutor(opciones[0].ID, frase.ID);

        // Mostrar opción 2
        document.getElementById('nombre2').textContent = `${opciones[1].nombre} ${opciones[1].apellido}`;
        document.getElementById('img2').src = opciones[1].imagen;
        document.getElementById('opcion2').onclick = () => seleccionarAutor(opciones[1].ID, frase.ID);

        // Mostrar progreso
        document.getElementById('numFrase').textContent = cantidadRespuestas + 1;
        document.getElementById('totalFrases').textContent = 15;

    } catch (error) {
        console.error("Error al cargar la frase:", error);
        document.getElementById('fraseTexto').textContent = "Error al cargar frase.";
    }
}






function seleccionarAutor(idSeleccionado) {
    const feedback = document.getElementById('feedback');
    cantidadRespuestas++;

    if (idSeleccionado == autorCorrectoID) {
        puntaje += 10;
        feedback.textContent = "¡Correcto! +10 puntos";
        feedback.style.color = "green";
        document.getElementById('puntos').textContent = puntaje;

        //SUMAR PUNTO EN LA BASE
        const idUsuario = localStorage.getItem("idUsuario");
        if (idUsuario) {
            fetch("http://localhost:4000/sumarPunto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idUsuario: idUsuario, puntos: 10 }) 
            })
            .then(res => res.json())
            .then(data => {
                console.log("Puntaje actualizado:", data);
            })
            .catch(err => {
                console.error("Error al actualizar puntaje:", err);
            });
        }

    } else {
        feedback.textContent = "Incorrecto 😢";
        feedback.style.color = "red";
    }


    setTimeout(() => {
        feedback.textContent = "";
        if (cantidadRespuestas < 15) {
            cargarFrase();
        } else {
            window.location.href = "fin.html";
        }
    }, 1000);
}

window.onload = () => {
    document.getElementById('puntos').textContent = puntaje;
    cargarFrase();
};
