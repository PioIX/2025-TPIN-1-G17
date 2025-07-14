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
let autorCorrectoID = null;
async function cargarFrase() {
    try {
        const response = await fetch('http://localhost:4000/frase');
        const data = await response.json();

        if (!data.ok) {
            document.getElementById('fraseTexto').textContent = "No hay frases.";
            return;
        }

        const frase = data.frase;
        autorCorrectoID = frase.autorCorrecto.ID;

        // Mostrar frase
        document.getElementById('fraseTexto').textContent = `"${frase.contenido}"`;

        // Armar opciones aleatoriamente
        const opciones = [frase.autorCorrecto, frase.autorIncorrecto];
        if (Math.random() > 0.5) opciones.reverse(); // Para que a veces esté a la izquierda, a veces a la derecha

        // Llenar botón 1
        document.getElementById('nombre1').textContent = `${opciones[0].nombre} ${opciones[0].apellido}`;
        document.getElementById('img1').src = opciones[0].imagen;
        document.getElementById('opcion1').onclick = () => seleccionarAutor(opciones[0].ID);

        // Llenar botón 2
        document.getElementById('nombre2').textContent = `${opciones[1].nombre} ${opciones[1].apellido}`;
        document.getElementById('img2').src = opciones[1].imagen;
        document.getElementById('opcion2').onclick = () => seleccionarAutor(opciones[1].ID);

    } catch (error) {
        console.error("Error al cargar la frase:", error);
    }
}

function seleccionarAutor(idSeleccionado) {
    const feedback = document.getElementById('feedback');

    if (idSeleccionado === autorCorrectoID) {
        puntaje+= 10;
        feedback.textContent = "¡Correcto! +1 punto";
        feedback.style.color = "green";
        document.getElementById('puntos').textContent = puntaje;

        // 👇 SUMAR PUNTO EN LA BASE
        const idUsuario = localStorage.getItem("idUsuario");
        if (idUsuario) {
            fetch("http://localhost:4000/sumarPunto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idUsuario: idUsuario })
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

    // Cargar nueva frase después de 2 segundos
    setTimeout(() => {
        feedback.textContent = "";
        cargarFrase();
    }, 2000);
}


// Iniciar juego al cargar la página
window.onload = () => {
    document.getElementById('puntos').textContent = puntaje;
    cargarFrase();
};
