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