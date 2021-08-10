const express = require('express');
const app = require('express');
const server = require('http').Server(app);

const options = {
  cors: {
    origin: 'http://localhost:4200',
  },
};
const io = require('socket.io')(server);

//será executada quando o  socket detectar que um novo dispositivo se conectou
io.on('connection', (socket) =>{
    //a cada conexão é gerado um idHandShake
    const idHandShake = socket.id;
    const { nomeSala } = socket.handshake.query;
    console.log(`Dispositivo ${idHandShake} -----> ${nomeSala}`);

    socket.join(nomeSala);

    socket.on('event', (res) =>{
        console.log("RES", res);
        socket.to(nomeSala).emit('event', res);
    })
    socket.on('disconnect', ()=>{
        console.log('usuário desconectado')
    })
})

server.listen(5000, () =>{
    console.log("O serviço está rodando na porta 5000")
})