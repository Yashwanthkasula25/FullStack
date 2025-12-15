export default function TaskFilters({ setFilters }: any) {
  return (
    <div className="flex gap-4 mb-4">
      <select onChange={(e) => setFilters((f: any) => ({ ...f, status: e.target.value }))}>
        <option value="">All Status</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Completed</option>
      </select>

      <select onChange={(e) => setFilters((f: any) => ({ ...f, priority: e.target.value }))}>
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>

      <select onChange={(e) => setFilters((f: any) => ({ ...f, sort: e.target.value }))}>
        <option value="">Sort</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
