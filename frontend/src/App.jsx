import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";  // Сторінка логіну
import RegisterForm from "./components/RegisterForm";  // Сторінка реєстрації
import ToDoPage from "./pages/ToDoPage";  // Сторінка To-Do List
import ProtectedRoute from "./components/ProtectedRoute";  // Захищений маршрут

function App() {
  return (
    <Router>
      <Routes>
        {/* Реєстрація (сторінка відкривається першою) */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Авторизація */}
        <Route path="/auth" element={<AuthForm />} />

        {/* Захищена сторінка To-Do List */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <ToDoPage />
            </ProtectedRoute>
          } 
        />

        {/* Перенаправлення на /register при відкритті кореня */}
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
