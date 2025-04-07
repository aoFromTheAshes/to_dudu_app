import { useState } from "react";
import axios from "axios";
import EditModal from "./EditModal";

export default function ToDoList({ tasks, GetList }) {
  const [isOpen, setIsOpen] = useState(null); // Зберігаємо ID завдання, що редагується

  function handleDelete(id) {
    axios.delete(`http://127.0.0.1:8000/todos/${id}`)
      .then(() => GetList())
      .catch(error => console.error("Помилка видалення:", error));
  };

  function handleCheckBox(task) {
    axios.put(`http://127.0.0.1:8000/todos/${task.id}`, {
      title: task.title,
      id: task.id,
      description: task.description,
      completed: !task.completed
    })
    .then(() => GetList()) 
    .catch(error => console.error("Помилка оновлення:", error));
  };

  return (
    <>
      <div className="todo-part">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <button onClick={() => handleCheckBox(task)}>
                {task.completed ? "Completed ✅" : "In Progress ⏳"}
              </button>
              <button onClick={() => setIsOpen(isOpen === task.id ? null : task.id)}>
                Change
              </button>

              {/* Якщо isOpen === task.id, то показуємо EditModal під цим завданням */}
              {isOpen === task.id && (
                <EditModal task={task} GetList={GetList} setIsOpen={() => setIsOpen(null)} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
