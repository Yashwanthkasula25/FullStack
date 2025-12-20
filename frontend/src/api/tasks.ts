import axios from "./axios";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  userId: string;
  createdAt: string;
}




export const getMyTasks = async (): Promise<Task[]> => {
  const res = await axios.get("/tasks", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};


/* CREATE TASK */
export const createTask = async (data: {
  title: string;
  description: string;
}) => {
  const res = await axios.post("/tasks", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

/* DELETE TASK */
export const deleteTask = async (id: string) => {
  const res = await axios.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

/* UPDATE TASK */
export const updateTask = async (data: {
  id: string;
  title: string;
  description: string;
}) => {
  const res = await axios.put(
    `/tasks/${data.id}`,
    {
      title: data.title,
      description: data.description,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

/* TOGGLE STATUS */
export const toggleTask = async (id: string) => {
  const res = await axios.patch(
    `/tasks/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};
