import { Task } from "../types/task";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

export default function TaskList({ tasks, onDelete, onEdit }: Props) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>
              {task.status} • {task.priority}
            </p>
            <p className="text-sm">
              Due: {new Date(task.dueDate).toDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-500"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
