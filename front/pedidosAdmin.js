function obtenerDatosAdmin() {
    //Llamar a las funciones de DOM para leer los inputs
    let password = ui.getPassword()
    let name = ui.getNombre()
    
    //Crear el objeto con esos valores y llamar a la funcion login pasandole el objeto datos
    let datos = {
        nombre: name,
        contraseña: password
    }

    cargarDatos(datos)
}

//cargar nuevos usuarios

async function cargarDatosAdmin(datos) {
    try {
        response = await fetch("http://localhost:4000/agregarUsuarios   ", {
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
            ui.showModal("Usuario agregado correctamente");
        }
    } catch (error) {
        console.log("Error", error);
    }    
}

//eliminar usuarios ya creados

async function eliminarUsuariosAdmin() {
    let datos = {
        nombre: getSelectedItem()
    }

    response = await fetch("http://localhost:4000/eliminarUsuarios", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    });

    document.getElementById("mensaje").innerText = "Usuario eliminado correctamente.";


}