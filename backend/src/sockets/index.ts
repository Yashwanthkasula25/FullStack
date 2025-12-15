import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("join", (userId: string) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};

export const emitTaskUpdate = (task: any) => {
  io.emit("task:updated", task);
};

export const emitAssignment = (userId: string, task: any) => {
  io.to(userId).emit("task:assigned", task);
};
