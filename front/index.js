function obtenerDatos() {
    //Llamar a las funciones de DOM para leer los inputs
    let password = ui.getPasswordAdmin()
    let name = ui.getNombreAdmin()
    
    //Crear el objeto con esos valores y llamar a la funcion login pasandole el objeto datos
    let datos = {
        nombre: name,
        contraseña: password
    }

    registro(datos)
}

function   registro(datos) {
    
}

//Esta esa para el admin
async function cargarDatos() {
    try {
        let datos = obtenerDatos();
        response = await fetch("http://localhost:4000/agregarUsuarios", {
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


    