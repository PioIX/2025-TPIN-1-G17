var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

//const express = require('express');
const path = require('path');
//const app = express();

// Asegurate de exponer la carpeta front para acceder a las imágenes
app.use(express.static(path.join(__dirname, './front'))); // o './front' si estás adentro del mismo nivel


// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */

//Pongo el servidor a escuchar
app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
});

//LOGIN
app.post('/login', async function (req, res) {
    console.log(req.body);
    try {
        const resultado = await realizarQuery(`
            SELECT * FROM Usuarios 
            WHERE nombre = '${req.body.nombre}' AND password = '${req.body.password}'
        `);

        if (resultado.length > 0) {
            const usuario = resultado[0];
            res.send({
                ok: true,
                mensaje: "Login correcto",
                id: usuario.ID,
                es_admin: usuario.es_admin
            });
        } else {
            res.send({
                ok: false,
                mensaje: "Credenciales incorrectas"
            });
        }

    } catch (error) {
        res.send({
            ok: false,
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
});

//usuario admin

//a partir de acá es el registro de usuario admin

//arreglado
app.post('/agregarUsuario', async function (req, res) {
    console.log(req.body)
    let vector = await realizarQuery(`SELECT * FROM Usuarios WHERE nombre="${req.body.nombre}"`)
    if (vector.length == 0) {
        realizarQuery(`
            INSERT INTO Usuarios (nombre,puntaje,password) VALUES
                ('${req.body.nombre}', 0,'${req.body.password}');
            `)
        res.send({ res: "ok" })
    } else {
        res.send({ res: "Ya existe ese dato" })

    }
})

//agregar frase
app.post('/agregarFrase', async function (req, res) {
    console.log(req.body)
    let vector = await realizarQuery(`SELECT * FROM Frases WHERE contenido="${req.body.contenido}"`)
    if (vector.length == 0) {
        realizarQuery(`
            INSERT INTO Frases (contenido, procedencia, id_autor, id_autor_incorrecto) VALUES
                ('${req.body.contenido}', '${req.body.procedencia}', ${req.body.id_autor}, ${req.body.id_autor_incorrecto});
            `)
        res.send({ res: "ok" })
    } else {
        res.send({ res: "Ya existe esa frase" })

    }
})

//registro
app.post('/registro', async function (req, res) {
    try {
        console.log(req.body)
        vector = await realizarQuery(`SELECT * FROM Usuarios WHERE nombre='${req.body.nombre}'`)

        if (vector.length == 0) {
            realizarQuery(`
                    INSERT INTO Usuarios (nombre, puntaje, password) VALUES
                        ('${req.body.nombre}',0, '${req.body.password}');
                    `)
            res.send({ res: "ok", agregado: true })
        } else {
            res.send({ res: "Ya existe ese dato", agregado: false })
        }
        

    } catch (e) {
        res.status(500).send({
            agregado: false,
            mensaje: "Error en el servidor",
            error: e.message
        });
    }
})

// BORRAR USUARIO
app.post('/borrarUsuario', async function (req, res) {
    try {
        const nombre = req.body.nombre;

        const vector = await realizarQuery(`SELECT * FROM Usuarios WHERE nombre='${nombre}'`);

        if (vector.length > 0) {
            await realizarQuery(`DELETE FROM Usuarios WHERE nombre='${nombre}'`);
            res.send({ borrado: true, mensaje: "Usuario eliminado correctamente" });
        } else {
            res.send({ borrado: false, mensaje: "Usuario no encontrado" });
        }

    } catch (error) {
        res.status(500).send({
            borrado: false,
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
});



//JUEGO
/* app.get('/frase', async (req, res) => {
    try {
        const frases = await realizarQuery("SELECT * FROM Frases ORDER BY RAND() LIMIT 1;");
        if (frases.length > 0) {
            res.send({ ok: true, frase: frases[0] });
        } else {
            res.send({ ok: false, mensaje: "No hay frases" });
        }
    } catch (error) {
        res.status.send({ ok: false, mensaje: "Error en el servidor", error: error.message });
    }
}); */
app.get('/frase', async (req, res) => {
    try {
        const frases = await realizarQuery("SELECT * FROM Frases ORDER BY RAND() LIMIT 1;");
        if (frases.length === 0) {
            return res.send({ ok: false, mensaje: "No hay frases" });
        }
        const frase = frases[0];
        const autorCorrecto = await realizarQuery(`SELECT * FROM Autores WHERE ID = ${frase.id_autor}`);
        const autorIncorrecto = await realizarQuery(`SELECT * FROM Autores WHERE ID = ${frase.id_autor_incorrecto}`);

        res.send({
            ok: true,
            frase: {
                id: frase.ID,
                contenido: frase.contenido,
                procedencia: frase.procedencia,
                autorCorrecto: autorCorrecto[0],
                autorIncorrecto: autorIncorrecto[0]
            }
        });

    } catch (error) {
        res.status(500).send({
            ok: false,
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
});


app.post('/sumarPunto', async function(req, res) {
    const { idUsuario } = req.body;
    console.log(idUsuario)
    try {
        await realizarQuery(`
            UPDATE Usuarios
            SET puntaje = puntaje + 10
            WHERE ID = ${idUsuario}
        `);

        res.send({ ok: true, mensaje: "Punto sumado" });
    } catch (error) {
        res.send({ ok: false, mensaje: "Error al sumar punto", error: error.message });
    }
});


//PUNTUACIONES
/*
app.get('/puntaje', async (req, res) => {
    try {
        const puntaje = await realizarQuery("SELECT puntaje, nombre FROM Usuarios ");
        if (puntaje.length > 0) {
            res.send({ ok: true, puntaje: puntaje });
        } else {
            res.send({ ok: false, mensaje: "No hay puntajes" });
        }
    } catch (error) {
        res.send({ ok: false, mensaje: "Error en el servidor", error: error.message });
    }
});
*/
   
app.get("/puntaje", async function (req, res) {
    try {
        const vector = await realizarQuery("SELECT ID, nombre, puntaje FROM Usuarios ORDER BY puntaje DESC");
        res.send({ ok: true, puntos: vector });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    }
});

//modificar frases

app.put('/modificarFrase', async function(req, res) {
    try {
        await realizarQuery(`UPDATE Frases SET
            contenido = '${req.body.contenido}', procedencia = '${req.body.procedencia}', id_autor = ${req.body.id_autor}, id_autor_incorrecto = ${req.body.id_autor_incorrecto} WHERE ID = ${req.body.id};`);

        res.send({ ok: true, mensaje: "Frase modificada correctamente" });
    } catch (e) {
        console.log("ERROR:", e.message);
        res.send({ ok: false, mensaje: "Error en la modificación", error: e.message });
    }
});

