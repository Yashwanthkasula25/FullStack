import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
    },
  });

  return (
    <div className="bg-slate-900 p-4 rounded-lg space-y-3">
      <input
        className="w-full p-2 rounded bg-slate-800 text-white"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 rounded bg-slate-800 text-white"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-red-600 px-4 py-2 rounded text-white"
        onClick={() => mutation.mutate({ title, description })}
      >
        Add Task
      </button>
    </div>
  );
}
