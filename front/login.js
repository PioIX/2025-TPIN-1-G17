async function login(datos) {
    try {
        response = await fetch("http://localhost:4000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response)
        let result = await response.json()
        console.log(result)
    } catch (error) {
        console.error("Error", error);
    }
   
}

function obtenerDatos() {
    //Llamar a las funciones de DOM para leer los inputs
    let pass = getContraseña()
    let name = getNombre()
    
    //Crear el objeto con esos valores y llamar a la funcion login pasandole el objeto datos
    let datos = {
        nombre: name,
        contraseña: pass
    }

    login(datos)
}