import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    function handleRegister() {
        if (!email || !password || !confirmPassword) {
            alert("Заповніть всі поля!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Паролі не співпадають!");
            return;
        }

        console.log("🟡 Відправляємо реєстраційний запит:", { email, password });

        axios.post("http://127.0.0.1:8000/auth/register", { email, password })
            .then(() => {
                alert("Реєстрація успішна! Увійдіть у систему.");
                navigate("/auth"); // Перенаправлення на логін
            })
            .catch(error => {
                console.error("❌ Помилка реєстрації", error.response?.data || error.message);
                alert(error.response?.data?.detail || "Помилка реєстрації");
            });
    }

    function handleGoogleLogin(response) {
        console.log("Google response (реєстрація):", response);
      
        axios.post("http://127.0.0.1:8000/auth/google/callback", {
            token: response.credential
        })
        .then(res => {
            console.log("✅ Успішна Google-реєстрація", res.data);
            localStorage.setItem("token", res.data.access_token);
            alert("Успішна реєстрація через Google!");
            navigate("/app");
        })
        .catch(err => {
            console.error("❌ Помилка реєстрації через Google", err);
            alert("Помилка реєстрації через Google");
        });
      }
      

    return (
        <div className="register">
            <h2>Реєстрація</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Повторіть пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p>Вже є акаунт? <a href="/auth">Log in</a></p>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Помилка реєстрації через Google")}
            />

        </div>
    );
}
