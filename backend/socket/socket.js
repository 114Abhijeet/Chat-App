import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
//This creates a standard HTTP server using the http module.The app (Express application) is passed as an 
//argument,so the HTTP server uses the Express app to handle HTTP requests.
const server = http.createServer(app);

//Why the http server is passed to Socket.io
//When you create a new Socket.IO server instance 'io', you need to attach it to an HTTP server. This integration
//allows the Socket.io server to upgrade an HTTP connection to a WebSocket connection, enabling real-time, bidirectional 
//communication.
const io = new Server(server, {
//The cors configuration allows the server to accept requests from the specified origin, which is crucial for
//development setups where the frontend and backend might run on different ports.
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
    //delete userSocketMap[userId] removes the key-value pair associated with userId from the userSocketMap object.
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };