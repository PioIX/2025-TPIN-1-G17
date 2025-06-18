async function login() {
    let datos = obtenerDatos();
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

