import { Server, Socket } from 'socket.io';
import { createConnection } from 'typeorm';

export const io = new Server();

export const initializeSocket = () => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication Error'));
        }
        return next();
    });

    io.on('connection', (socket: Socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Join a room based on userId
        socket.on('joinRoom', (userId: number) => {
            socket.join(`user_${userId}`);
            console.log(`Socket ${socket.id} joined room user_${userId}`);
        });

        // Broadcasting of messages to a room
        socket.on('broadcastToRoom', (room: string, message: string) => {
            io.to(room).emit('broadcastingMessage', message);
            console.log(`Message broadcasted to room ${room}: ${message}`);
        });

        // Handling disconnects
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

  
    io.on('error', (err: Error) => {
        console.error('Socket.IO error:', err.message);
    });

    // Initializing Socket.IO after db connection
    createConnection().then(() => {
        console.log('Socket.IO initialized');
    });
};
