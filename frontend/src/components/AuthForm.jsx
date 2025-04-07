import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin() {
        if (!email || !password) {
            alert("Заповніть всі поля!");
            return;
        }
    
        console.log("🟡 Відправляємо логін-запит:", { email, password });
    
        axios.post("http://127.0.0.1:8000/auth/login", { email, password })
            .then(response => {
                console.log("✅ Успішний вхід:", response.data);
                localStorage.setItem("token", response.data.access_token);
                alert("Вхід успішний!");
                navigate("/app");
            })
            .catch(error => {
                console.error("❌ Помилка авторизації", error.response?.data || error.message);
                alert("Неправильний email або пароль");
            });
    }

    function handleGoogleLogin(response) {
        console.log("Google response:", response);
    
        axios.post("http://127.0.0.1:8000/auth/google/callback", {
            token: response.credential  // <- Ось що нам треба відправити
        })
        .then(res => {
            console.log("✅ Успішний Google-вхід", res.data);
            localStorage.setItem("token", res.data.access_token);
            alert("Google-вхід успішний!");
            navigate("/app");
        })
        .catch(err => {
            console.error("❌ Помилка входу через Google", err);
            alert("Помилка входу через Google");
        });
    }
    

    return (
        <div className="login">
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
            <button onClick={handleLogin}>Login</button>

            <p>Ще не маєте акаунта? <a href="/register">Зареєструйтесь</a></p>

            {/* Додаємо Google Login */}
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Помилка входу через Google")}
            />
        </div>
    );
}
