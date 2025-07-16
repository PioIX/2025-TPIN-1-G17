/*

let puntaje = 0;
let totalFrases = 24; // o la cantidad real que tengas
let numFrase = 1;
let idUsuario = localStorage.getItem("idUsuario");

async function cargarFrase() {
    const res = await fetch("http://localhost:4000/frase");
    const data = await res.json();

    if (data.ok) {
        const f = data.frase;
        console.log("Frase completa recibida:", f);

        // Mostrar frase
        document.getElementById("fraseTexto").textContent = f.texto;

        // Elegir aleatoriamente si va en el botón 1 o 2
        const correctaPrimero = Math.random() < 0.5;

        if (correctaPrimero) {
            cargarOpcion("opcion1", f.autor_correcto, f.imagen_correcta, true);
            cargarOpcion("opcion2", f.autor_incorrecto, f.imagen_incorrecta, false);
        } else {
            cargarOpcion("opcion1", f.autor_incorrecto, f.imagen_incorrecta, false);
            cargarOpcion("opcion2", f.autor_correcto, f.imagen_correcta, true);
        }

        document.getElementById("numFrase").textContent = numFrase;
        document.getElementById("totalFrases").textContent = totalFrases;
        document.getElementById("puntos").textContent = puntaje;
    }
}

function cargarOpcion(botonId, nombre, imagen, esCorrecta) {
    const btn = document.getElementById(botonId);
    btn.querySelector("img").src = imagen;
    btn.querySelector("p").textContent = nombre;
    
    btn.onclick = () => {
        if (esCorrecta) {
            puntaje++;
            document.getElementById("puntos").textContent = puntaje;
            actualizarPuntaje();
        }
        numFrase++;
        if (numFrase <= totalFrases) {
            cargarFrase();
        } else {
            alert("¡Juego terminado!");
            // podés redirigir a puntuaciones
        }
    };
}

async function actualizarPuntaje() {
    await fetch("http://localhost:4000/actualizarPuntaje", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUsuario,
            puntaje: puntaje
        })
    });
}

cargarFrase();
*/
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

            const posibleFrase = data.frase;
            if (!frasesYaSalieron.includes(posibleFrase.ID)) {
                frase = posibleFrase;
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

    if (idSeleccionado === autorCorrectoID) {
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

    // Esperar 1 seg antes de mostrar la siguiente frase o terminar el juego
    setTimeout(() => {
        feedback.textContent = "";

        if (cantidadRespuestas < 15) {
            cargarFrase();
        } else {
            //reirecciona al html final
            window.location.href = "fin.html";
        }
    }, 1000);
}



// Iniciar juego al cargar la página
window.onload = () => {
    document.getElementById('puntos').textContent = puntaje;
    cargarFrase();
};
