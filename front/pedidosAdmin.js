function obtenerDatosAdmin() {
    let password = ui.getPassword()
    let name = ui.getNombre()
    let es_admin = ui.getAdmin()
    
    let datos = {
        nombre: name,
        password: password,
        es_admin: es_admin
    }
    agregarUsuario(datos)
    
}

async function agregarUsuario(datos) {
    try {
        response = await fetch("http://localhost:4000/agregarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response)
        let result = await response.json()
        console.log(result)

        if(result.agregado == true){
            alert("Usuario agregado correctamente");
        }
    } catch (error) {
        console.log("Error", error);
    }    
}

function eliminarUsuariosAdmin() {
    let name = document.getElementById("nombreEliminar").value;

    let datos = {
        nombre: name
    };

    borrarUsuario(datos);
}

async function borrarUsuario(datos) {
    try {
        let response = await fetch("http://localhost:4000/borrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        let result = await response.json();
        console.log(result);

        

    } catch (error) {
        console.log("Error", error);
        ui.showModal("Ocurrió un error al intentar borrar el usuario");
    }
}

function obtenerDatosFrase() {
    
    let contenido = document.getElementById("contenido").value;
    let procedencia = document.getElementById("procedencia").value;
    let id_autor = document.getElementById("id_autor").value;
    let id_autor_incorrecto = document.getElementById("id_autor_incorrecto").value;
    
    let datos = {
        contenido: contenido,
        procedencia: procedencia,
        id_autor: id_autor,
        id_autor_incorrecto: id_autor_incorrecto
    }
    agregarFrase(datos)
    
}

async function agregarFrase(datos) {

    
    try {
        response = await fetch("http://localhost:4000/agregarFrase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response)
        let result = await response.json()
        console.log(result)

        if(result.agregado == true){
            ui.showModal("Frase agregada correctamente");
        }
    } catch (error) {
        console.log("Error", error);
    }    
}

//modificar frases

async function modificarFrase() {
    let datos = {
        id: document.getElementById("fraseId").value,
        contenido: document.getElementById("nuevoContenido").value,
        procedencia: document.getElementById("nuevaProcedencia").value,
        id_autor: document.getElementById("nuevoAutor").value,
        id_autor_incorrecto: document.getElementById("nuevoIncorrecto").value
    };

    try {
        let response = await fetch("http://localhost:4000/modificarFrase", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        let result = await response.json();
        if (result.ok) {
            alert("Frase modificada correctamente");
        } else {
            alert("Error: " + result.mensaje);
        }
    } catch (error) {
        console.error("Error al modificar frase:", error);
    }
}

//agregar autor

function obtenerDatosAutor() {
    let nombre = document.getElementById("nombreAutor").value;
    let apellido = document.getElementById("apellidoAutor").value;
    let origen = document.getElementById("origen").value;
    let imagen = document.getElementById("imagenAutor").value;

    let datos = {
        nombre: nombre,
        apellido: apellido,
        origen: origen,
        imagen: imagen
    };

    agregarAutor(datos);
}

async function agregarAutor(datos) {
    try {
        const response = await fetch("http://localhost:4000/agregarAutor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();
        console.log(result);

        if (result.ok) {
            alert("Autor agregado correctamente");
        } else {
            alert("Error al agregar autor: " + result.mensaje);
        }

    } catch (error) {
        console.error("Error al hacer el fetch:", error);
    }
}

