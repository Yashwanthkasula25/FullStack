import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../utils/task.schema";
import type {TaskInput} from "../utils/task.schema";
export default function TaskForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<TaskInput>;
  onSubmit: (data: TaskInput) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h2 className="text-xl font-bold">
        {initialData ? "Edit Task" : "Create Task"}
      </h2>

      <input {...register("title")} placeholder="Title" className="input" />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register("description")} placeholder="Description" className="input" />

      <input type="date" {...register("dueDate")} className="input" />

      <select {...register("priority")} className="input">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>

      <select {...register("status")} className="input">
        <option>To Do</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Completed</option>
      </select>

      <input {...register("assignedToId")} placeholder="Assign to (User ID)" className="input" />

      <button className="btn w-full">
        Save
      </button>
    </form>
  );
}
