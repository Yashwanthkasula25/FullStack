import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getMyTasks,
  deleteTask,
  updateTask,
  toggleTask,
} from "../api/tasks";
import CreateTask from "./CreateTask";
import type { Task } from "../types/task";

export default function Dashboard() {
  const queryClient = useQueryClient();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ================= FETCH TASKS ================= */
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getMyTasks,
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      setEditingTask(null);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  /* ================= TOGGLE STATUS ================= */
  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const saveEdit = () => {
    if (!editingTask) return;

    updateMutation.mutate({
      id: editingTask.id,
      title,
      description,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Dashboard
      </h1>

      <CreateTask />

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Your Tasks
      </h2>

      {isLoading && (
        <p className="text-gray-400">Loading...</p>
      )}

      {isError && (
        <p className="text-red-400">
          Failed to load tasks
        </p>
      )}

      {!isLoading && tasks.length === 0 && (
        <p className="text-gray-400">
          No tasks yet. Create one 👆
        </p>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="bg-slate-900 p-4 rounded-lg flex justify-between items-center"
          >
            {editingTask?.id === task.id ? (
              <div className="w-full">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mb-2 p-2 rounded bg-slate-800"
                />
                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="w-full mb-2 p-2 rounded bg-slate-800"
                />

                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3
                    className={`font-semibold ${
                      task.status === "COMPLETED"
                        ? "line-through text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </h3>
{/* Place this inside your task map loop, near the title */}
<div className="flex gap-2 mt-1 mb-2">
  <span className="text-xs bg-gray-700 text-white px-2 py-0.5 rounded">
    {task.priority}
  </span>
  {task.dueDate && (
    <span className="text-xs text-orange-400">
      📅 {new Date(task.dueDate).toLocaleDateString()}
    </span>
  )}
</div>
                  <p className="text-gray-400 text-sm">
                    {task.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
  onClick={() => toggleMutation.mutate(task.id)}
  className={`px-3 py-1 rounded text-sm font-bold ${
    task.status === "COMPLETED" 
      ? "bg-yellow-600 text-black" 
      : "bg-green-600 text-white"
  }`}
>
  {task.status === "COMPLETED" ? "Re-open" : "Mark Done"}
</button>

                  <button
                    onClick={() => startEdit(task)}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteMutation.mutate(task.id)
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
