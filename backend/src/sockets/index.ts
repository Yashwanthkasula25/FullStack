import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);
  });
};

export const emitTaskUpdate = (task: any) => {
  io.emit("task:updated", task);
};

export const emitAssignment = (userId: string, task: any) => {
  io.emit(`user:${userId}:assigned`, task);
};
