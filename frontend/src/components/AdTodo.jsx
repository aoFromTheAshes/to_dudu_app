import { useState } from "react";
import axios from "axios";

export default function AdTodo({ GetList }) { 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (!title || !description) {
      alert("Заповніть всі поля!");
      return;
    }

    axios.post("http://127.0.0.1:8000/todos", { title, description })
      .then(() => {
        setTitle("");
        setDescription("");
        GetList(); 
      })
      .catch(error => console.error("Помилка додавання:", error));
  }

  return (
    <>
      <h3>Додати завдання</h3>
      <input 
        type="text"
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="text"
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Додати</button>
    </>
  );
}
