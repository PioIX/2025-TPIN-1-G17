let idLogueado = 0;

function obtenerDatos() {
    let password = ui.getPassword()
    let nombre = ui.getNombre()

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
            if (result.es_admin == 1) {
                location.href = 'index2.html';
            } else {
                location.href = 'index.html';
            }
            
        } else {
            alert(result.mensaje)
        }
    } catch (error) {
        console.error("Error", error);
    }
}

function obtenerDatosRegistro() {
    let password = ui.getContraseñaRegistro()
    let name = ui.getNombreRegistro()
    
    let datos = {
        nombre: name,
        password: password
    }
    agregarUsuarioRegistro(datos)
    
}

async function agregarUsuarioRegistro(datos) {
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

        if (result.res == "ok") {
            location.href = 'index.html';
        }
        
    } catch (error) {
        console.log("Error", error);
    }    
}

function cambiarPantalla() {
    location.href = 'quienlodijo.html';
}

function cambiarPantalla1() {
    location.href = 'index.html';
}
