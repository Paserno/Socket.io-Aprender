//Servidor de Exrpess
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');


class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // HTTP server
        this.server = http.createServer(this.app);


        //Configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones*/ });
    }
    middlewares() {
        //Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // Cors
        this.app.use(cors());
        
    }

    configurarSockets(){
        new Sockets(this.io);
    }


    execute() {

        // Inicializar Middlewares
        this.middlewares();

        //Inicializar Socket
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server correndo en el Puerto', this.port);
        });
    }
}

module.exports = Server;