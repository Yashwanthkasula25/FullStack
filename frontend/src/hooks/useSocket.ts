import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "../sockets";
import { useAuth } from "./useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const useSocket = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  useEffect(() => {
    if (!user) return;

    const socket = connectSocket(user.id);

    socket.on("task:updated", () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:assigned", (task) => {
      alert(`New task assigned: ${task.title}`);
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      disconnectSocket();
    };
  }, [user, qc]);
};
