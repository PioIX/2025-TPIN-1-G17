function cerrarSesion() {
    idLogged = 0;

    if (confirm("¿Estás seguro que quieres salir?")) {
        ui.clearLoginInputs();
        ui.clearRegisterInputs();
        alert("Se cerró la sesión");
        window.location.href = "IniciarSesion.html";
    } else {
        alert("La sesión sigue abierta");
    }
}
