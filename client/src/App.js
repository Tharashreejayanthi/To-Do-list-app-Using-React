import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title });
    setTitle("");
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input type="checkbox" checked={task.completed} onChange={() => handleToggle(task)} />
            {task.title}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;