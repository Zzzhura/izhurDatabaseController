import "../css/main.css";
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Останавливает стандартное поведение формы
    try {
      const response = await fetch("http://localhost:3001/login", {
        // URL бэкенда
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("Response:", data);
      // Обработка ответа, например, сохранение токена или перенаправление
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Используем onSubmit для отправки */}
        <div className="login-form">
          <h2 className="main-text">Login</h2>
          <label className="main-text" htmlFor="username">
            Username:
          </label>
          <br />
          <input
            className="input-field"
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Обновление состояния
          />
          <br />
          <br />

          <label className="main-text" htmlFor="password">
            Password:
          </label>
          <br />
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Обновление состояния
          />
          <br />
          <br />

          <button className="action-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
