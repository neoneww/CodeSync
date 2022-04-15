const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);

const io = require('socket.io')(server, {
	cors: {
		origin: ['http://localhost:3000'],
	},
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
	return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
		(socketId) => {
			return {
				socketId,
				userName: userSocketMap[socketId],
			};
		}
	);
}

io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
		userSocketMap[socket.id] = userName;
		socket.join(roomId);
		const clients = getAllConnectedClients(roomId);
		clients.forEach(({ socketId }) => {
			io.to(socketId).emit(ACTIONS.JOINED, {
				clients,
				userName,
				socketId: socket.id,
			});
		});
	});

	socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
		socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
	});

	socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
		io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
	});

	socket.on('disconnecting', () => {
		const rooms = [...socket.rooms];
		rooms.forEach((roomId) => {
			socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
				socketId: socket.id,
				userName: userSocketMap[socket.id],
			});
		});
		delete userSocketMap[socket.id];
		socket.leave();
	});
});

server.listen(5000, () => {
	console.log('working');
});

// const io = require('socket.io')(5000, {
// 	cors: {
// 		origin: ['http://localhost:3000'],
// 	},
// });
// io.on('connection', (socket) => {
// 	console.log(socket.id);
// });
