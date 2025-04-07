import { useState, useEffect } from "react";
import "./ToDoPage.css";
import TodoList from "../components/ToDoList";
import AdTodo from "../components/AdTodo";
import axios from "axios";

export default function ToDoPage() {
  const [tasks, setTasks] = useState([]);

  function GetList() {
    axios.get("http://127.0.0.1:8000/todos")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error("Помилка отримання даних:", error));
  }

  useEffect(() => {
    GetList();
  }, []);

  return (
    <div className="todo-container">
      <h1>To dodo List</h1>
      <AdTodo GetList={GetList} /> 
      <TodoList tasks={tasks} GetList={GetList} />
    </div>
  );
}

