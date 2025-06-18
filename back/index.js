var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/students', async function(req,res){
    try {
        let respuesta;
        if (req.query.id != undefined) {
            respuesta = await realizarQuery(`SELECT * FROM Students WHERE id=${req.query.id}`)
        } else {
            respuesta = await realizarQuery("SELECT * FROM Students");
            console.log(respuesta)
        }    
        res.send(respuesta);
    } catch (error) {
        res.send({mensaje:"Tuviste un error", error:error.message});
    }
})
app.post('/students',async function(req,res) {
        console.log(req.body) //Los pedidos post reciben los datos del req.body
        try {
            await realizarQuery(`
            INSERT INTO Students (id,FirstName,LastName,mail,id_grade) VALUES
                (${req.body.id},"${req.body.FirstName}","${req.body.LastName}","${req.body.mail}",${req.body.id_grade});
            `)
            //El back te convierte solito a JSON siempre y cuando mande un objeto
            res.send({respuesta: "Estudiante agregado"})
        } catch (error) {
            res.send({respuesta: "Tuviste un error: ", error:error.message})
        }
})

app.get("/animales", async function(req, res) {
    try {
        if (req.query.especie != undefined) {
            res.send(await realizarQuery(`SELECT * FROM Animales WHERE especie = '${req.query.especie}'`))
        } else {
            throw "No pusiste la especie"
        }
    } catch (e) {
        res.send(e.message);
    }  
})
//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});


app.post("/login", async function(req, res) {
    try {
        /**
         * En este pedido, deberiamos verificar si el nombre y la contraseña existen en la tabla usuarios
         * SQL
         * Los datos los leo como req.body porque estoy en un post
         * SELECT * FROM Usuarios WHERE nombre = '${req.body.nombre}' AND contraseña = '${req.body.password}'
         */
    } catch (e) {
        res.send(e.message);
    }  
})

function ingresar() {
    let email = ui.getEmail();
    let contraseña = ui.getPassword();
    let result = login(email, contraseña)
    if (result == 0) {
        ui.showModal("Error", "Volve a ingresar tus datos");
    } else if (result > 0) {
        idLogeado = result;
        ui.setUser(email)
        notas(result);
        ui.changeScreen();
    } else {
        ui.showModal("Error", "No encontramos el usuario en nuestra base");
    }
}

function registro(email, nombre, contraseña) {
    for (let i = 0; i < users.length; i++) {
        if (email == users[i].correo) {
            return -1;
        }
    }
    users.push(new User(nombre, email, contraseña));
    return userId - 1;

}

function registrar() {
    let email = ui.getEmail();
    let contraseña = ui.getPassword();
    let user = ui.getUser();
    let respuesta = registro(email, user, contraseña);

    if (respuesta != -1) {
        ui.showModal("Listo", "Ya estàs registrado.")
        ingresar();
    } else {
        ui.showModal("Error", "Volve a ingresar tus datos")
        alert("error");
    }

}