let idLogueado = 0;

function obtenerDatos() {
    //Llamar a las funciones de DOM para leer los inputs
    let password = ui.getPassword()
    let nombre = ui.getNombre()

    //Crear el objeto con esos valores y llamar a la funcion login pasandole el objeto datos
    let datos = {
        nombre: nombre,
        password: password
    }

    login(datos)
}

async function login(datos) {
    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        console.log(response);

        const result = await response.json();
        console.log(result);

        if (result.ok) {
            localStorage.setItem('idUsuario', result.id, result.es_admin);
            //let idUsuario = localSoçtorage.getItme('idUsuario) 
            if (result.es_admin == 1) {
                location.href = 'index2.html';
            } else {
                location.href = 'index.html';
            }
            
        }
    } catch (error) {
        console.error("Error", error);
    }
}