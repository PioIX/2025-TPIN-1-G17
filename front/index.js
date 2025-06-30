function obtenerDatosRegistro() {
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

async function cargarDatos(datos) {
    try {
        response = await fetch("http://localhost:4000/registro", {
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


    