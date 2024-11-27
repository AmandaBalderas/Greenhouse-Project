const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const i2c = require('i2c-bus');

// Dirección I2C del Arduino
const I2C_ADDRESS = 8;

// Iniciar el bus I2C
const i2cBus = i2c.openSync(1);

// Crear un servidor HTTP básico
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'user_interface.html'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar la página');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/bootstrap.min.css') {
        fs.readFile(path.join(__dirname, 'bootstrap.min.css'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/chart.js') {
        fs.readFile(path.join(__dirname, 'chart.js'), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        
        try {
            const data = JSON.parse(message);
	    console.log('Mensaje recibido:', data);

            if (data.action === "irrigation") {
                sendI2CCommand(data.value === "on" ? "BOMBA_ON" : "BOMBA_OFF");
            } else if (data.action === "fan") {
                sendI2CCommand(data.value === "on" ? "VENTILADOR_ON" : "VENTILADOR_OFF");
            }
        } catch (err) {
            console.error('Error al procesar mensaje:', err);
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Función para enviar comandos I2C
function sendI2CCommand(command) {
    try {
	const commandWithNewLine = command + "\n";
        i2cBus.writeI2cBlockSync(I2C_ADDRESS, 0, commandWithNewLine.length, Buffer.from(commandWithNewLine, 'utf-8'));
        console.log(`Comando enviado al Arduino: ${command}`);
    } catch (err) {
        console.error('Error al enviar comando I2C:', err);
    }
}

// Iniciar el servidor
server.listen(8765, '192.168.1.254', () => {
    console.log('Servidor WebSocket escuchando en ws://192.168.1.254:8765');
});

