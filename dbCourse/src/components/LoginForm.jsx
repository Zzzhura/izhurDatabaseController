import "../css/main.css";
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const handleAction = async (action) => {
    try {
      const url = action === "login" ? "http://localhost:3001/login" : "http://localhost:3001/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.success) {
        setAlertMessage(data.message);
        setAlertColor("green");
        if (action === "login") {
          console.log("User logged in successfully! Role:", data.role);
          // Redirect or perform actions after login here.
        } else {
          console.log("User registered successfully!");
          // Optionally clear form fields after registration.
          setUsername("");
          setPassword("");
        }
      } else {
        setAlertMessage(data.message);
        setAlertColor("red");
      }
    } catch (error) {
      console.error(`Error during ${action}:`, error);
      setAlertMessage("An error occurred. Please try again later.");
      setAlertColor("red");
    }
  };

  return (
    <div className="form-wrapper">
      <form>
        <div className="login-form">
          <h2 className="main-text">Welcome to database controller</h2>
          {alertMessage && (
            <div
              className={`alert ${
                alertColor === "green" ? "alert-success" : "alert-error"
              }`}
            >
              {alertMessage}
            </div>
          )}

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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <div className="button-group">
            <button
              className="action-button"
              type="button"
              onClick={() => handleAction("login")}
            >
              Login
            </button>
            <button
              className="action-button"
              type="button"
              onClick={() => handleAction("register")}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
