

class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvent();
        
    }

    socketEvent() {
        // on connection
        this.io.on('connection', (socket) => {

            // Escuchar el evento: mensaje-to-sv
            socket.on('mensaje-to-sv', (data) => {
                console.log(data)

                this.io.emit('mensaje-from-server', data);
            })
        });
    }



}

module.exports = Sockets;