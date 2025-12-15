import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  socket = io("http://localhost:5000", {
    withCredentials: true,
    query: { userId },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
