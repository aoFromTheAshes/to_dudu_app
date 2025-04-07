import { useState } from "react";
import axios from "axios";

export default function EditModal({ task, GetList, setIsOpen }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  function saveEdit() {
    axios.put(`http://127.0.0.1:8000/todos/${task.id}`, {
      title: title,
      id: task.id,
      description: description,
      completed: task.completed 
    })
    .then(() => {
      GetList(); // Оновити список завдань
      setIsOpen(false); // Закрити модалку
    }) 
    .catch(error => console.error("Помилка оновлення:", error));
  }
  
  return (
    <div className="modal">
      <h3>Редагувати завдання</h3>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={saveEdit}>Зберегти</button>
      <button onClick={() => setIsOpen(false)}>Скасувати</button>
    </div>
  );
};
