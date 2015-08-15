// Daniel Sánchez Rojo and Diego Martín Guzmán
// Kill2Live

"use strict";

var net = require('net'),
    readlineSync = require('readline-sync'),
    readline = require('readline'),
    sockets = [],
    i = 0;
	


function player1(socket, client1, lives1, lives2, ammo1, ammo2) {
    socket.write("\nPlayer 1 has arrived the game.\n");
    
     
    while (lives1 !== 0 && lives2 !== 0) {
        socket.write("\nMenu: \n[0] Surrender \n[1] Shot \n[2] Protect \n[3] Reload");
        var option = readlineSync.question('Choose an option, please: ');
        switch (opcion) {
        case "0":
            socket.write("\nI chickened out.\n");
            socket.destroy(socket);
            break;
        case "1":
            break;
        case "2":
                
            break;
        case "3":
            break;
        }
        
    }
}

// Main function
function game(socket, client1, client2) {
    var lives1 = 3,
        lives2 = 3,
        ammo1 = 0,
        ammo2 = 0,
        protect2 = false,
        protect2 = false;
    if (socket.remotePort === cliente1) {
        player1(socket, client1, lives1, lives2, ammo1, ammo2);
    } else if (socket.remotePort === client2) {
        player2(socket, client2, lives1, lives2, ammo1, ammo2);
    } else {console.log("ERROR here!"); }

}

// It runs when a socket has connected
function mainMenu(socket, client1, client2) {
    socket.write("\n\nSelect an option, please.\n[0] Exit \n[1]New game \n[2]About Kill2Live\n");

    var option = readlineSync.question('Choose an option, please: '),
        about = "This is a Node.js based game and focused on TCP.\nWritten and designed by Daniel Sánchez Rojo and Diego Martín Guzmán.\n";

	switch (option) {
    case "0":
        socket.write('\nBye, bye...\n');
        socket.destroy(socket);
        break;
    case "1":
        game(socket, client1, client2);
        break;
    case "2":
        socket.write("\n\n" + about + "\n\n");
        mainMenu(socket, client1, client2);
        break;
    }
}

// New Socket TCP opened
function newSocket(socket) {
	sockets.push(socket);
    i++;
    console.log("\nNumber of players at the server: " + i + "\n");
    if (i === 1) {
        var client1 = socket.remotePort;
        console.log("\nClient" + i + " = " + cliente1);
        socket.write("The game is about to begin!\n");
        mainMenu(socket, client1, client2);
    } else if (i === 2) {
        var cliente2 = socket.remotePort;
        console.log("\nClient" + i + " = " + cliente2);
        socket.write("The game is about to begin!\n");
        mainMenu(socket, client1, client2);

    } else if (i >= 3) {socket.write("\nLot of player connected. The server has run out. \nTry again later.");
                        socket.destroy(socket);
                       }
}

// This starts a new server and makes the conection when a new socket arrives
var server = net.createServer(newSocket);


// Listening at the port
var port = 8888;
console.log("Waiting for players at |" + port + "|...\n");
server.listen(port);
