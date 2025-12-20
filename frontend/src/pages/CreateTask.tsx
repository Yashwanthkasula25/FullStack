import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";

export default function CreateTask() {
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM"); // Default
  const [dueDate, setDueDate] = useState("");

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Clear form and refresh list
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    mutation.mutate({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : "", 
    });
  };

  return (
    <div className="bg-slate-900 p-6 rounded-lg mb-8 border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-white">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Task Title (Required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-red-500 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-red-500 outline-none h-24"
          />
        </div>

        {/* Priority & Due Date Row */}
        <div className="flex gap-4">
          
          {/* Priority Select */}
          <div className="w-1/2">
            <label className="block text-gray-400 text-xs mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-red-500 outline-none"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="w-1/2">
            <label className="block text-gray-400 text-xs mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-red-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {mutation.isPending ? "Creating..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}