//Código de DOM implementado por los docentes.

class UserInterface {
    constructor() {

    }

    /**
     * Obtiene el texto ingresado en el input "Correo electrónico", sección "Login".
     * @returns String que contiene el correo electrónico ingresado por el usuario.
     */
    getContraseña() {
        return document.getElementById("contraseña").value;
    }
    getNombre() {
        return document.getElementById("nombre").value;
    }
    getAdmin() {
        return document.getElementById("es_admin").value;
    }
    
    getNombreRegistro() {
        return document.getElementById("nombreRegistro").value;
    }
    getContraseñaRegistro() {
        return document.getElementById("passwordRegistro").value;
    }

    /**
     * Obtiene el texto ingresado en el input "Usuario", sección "Login".
     * @returns String que contiene el nombre de usuario.
     */
    getUser() {
        return document.getElementById("username").value;
    }

    /**
     * Modifica el nombre de usuario logueado presentado en pantalla.
     * @param {String} username Nombre del usuario logueado.
     */
    setUser(username) {
        document.getElementById("loggedUsername").textContent = `¡Bienvenido ${username}!`;
    }

    /**
     * Obtiene el texto ingresado en el input "Contraseña", sección "Login".
     * @returns String que contiene la contraseña ingresada por el usuario.
     */
    getPassword() {
        return document.getElementById("password").value;
    }

    /**
     * Vacía el contenido de los inputs del login / registro.
     */
    clearLoginInputs() {
        document.getElementById("nombre").value = "";
        document.getElementById("password").value = "";
    }

    /**
     * Si se está mostrando la pantalla de login la oculta y muestra la de notas. Y viceversa.
     */

    clearLoginInputs() {

        let formLogin = document.getElementById("formLogin");
        if (formLogin) {
            formLogin.reset();
        }
    }

    clearRegisterInputs() {
        let formRegister = document.getElementById("formRegister");
        if (formRegister) {
            formRegister.reset();
        }
    }

    

    /**
     * Muestra el modal y le inserta los textos que se reciben como parámetros.
     * @param {String} title Título que se quiere mostrar en el modal.
     * @param {String} body Texto del cuerpo del modal.
     */
    showModal(title, body) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").textContent = body;

        const modal = new bootstrap.Modal('#modal', {
            keyboard: true,
            focus: true
        });

        modal.show();
    }
}


   

/**
 * Objeto para manejar la UI en este TP, provisto por los docentes Nico Facón y Mati Marchesi.
 */
const ui = new UserInterface();
console.log("Probando UI:", ui);
