import axios from "axios";

export default function Card({ task, onTaskUpdated }) {
    function handleComplete() {
        axios.patch(`http://127.0.0.1:8000/todos/${task.id}/`, {
            completed: !task.completed
        })
        .then(() => onTaskUpdated()) 
        .catch(error => console.error("Помилка оновлення:", error));
    }

    function handleDelete() {
        axios.delete(`http://127.0.0.1:8000/todos/${task.id}/`)
        .then(() => onTaskUpdated()) 
        .catch(error => console.error("Помилка видалення:", error));
    };

    function handleCheckBox(id) {
        axios.put('http://127.0.0.1:8000/todos/' + id)
    };

    return (
        <div className="task-card">
            <input type="checkbox" checked={task.completed} onChange={handleComplete} />

            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={handleDelete}>❌ Видалити</button>
        </div>
    );
}
