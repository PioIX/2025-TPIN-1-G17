let idLogueado = 0;

async function login(datos) {
    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response)
        let result = await response.json()
        console.log(result)
        if (result.logged == true) {
            idLogueado = result.idUser
            //HACER CAMBIAR VENTANA
        }

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

async function envioPost(datos) {
    const response = await fetch('http://localhost:4000/students',{
        method:"POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
    })

    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}
