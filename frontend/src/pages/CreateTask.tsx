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
      alert("Task created");
    },
  });

  return (
    <div className="p-8 text-white">
      <input
        className="block mb-2 p-2 bg-slate-800"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="block mb-2 p-2 bg-slate-800"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-red-500 px-4 py-2"
        onClick={() => mutation.mutate({ title, description })}
      >
        Create
      </button>
    </div>
  );
}
