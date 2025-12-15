import { useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useTasks, useDeleteTask, useCreateTask, useUpdateTask } from "../hooks/useTasks";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import { Task } from "../types/task";

export default function Dashboard() {
  useSocket(); // 🔥 real-time enabled

  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const { data, isLoading } = useTasks(filters);
  const deleteTask = useDeleteTask();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Create Button */}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditTask(null);
          setOpen(true);
        }}
      >
        + Create Task
      </button>

      <TaskFilters setFilters={setFilters} />

      <TaskList
        tasks={data?.data || []}
        onDelete={(id) => deleteTask.mutate(id)}
        onEdit={(task) => {
          setEditTask(task);
          setOpen(true);
        }}
      />

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <TaskForm
          initialData={editTask || undefined}
          onSubmit={(formData) => {
            if (editTask) {
              updateTask.mutate({ id: editTask.id, data: formData });
            } else {
              createTask.mutate(formData);
            }
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
