var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

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
                id: usuario.id
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
app.post('/agregarUsuarios', async function (req, res) {
    try {
        console.log(req.body)
        if (req.body.es_admin == 1) {
            vector = await realizarQuery(`SELECT * FROM Usuarios WHERE nombre=${req.body.nombre}`)

            if (vector.length == 0) {
                realizarQuery(`
                    INSERT INTO Usuarios (nombre, puntaje, password) VALUES
                        ('${req.body.nombre}',0, '${req.body.password}');
                    `)
                res.send({ res: "ok" })
            } else {
                res.send({ res: "Ya existe ese dato" })

            }

        }
        else {
            res.send({ res: "No tiene permisos de administrador" })
        }
    } catch (e) {
        res.send(e.message);
    }
})