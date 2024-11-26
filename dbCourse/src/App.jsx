import { Outlet, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NavigationButton from "./components/NavigationButton";

import "./css/main.css";
import "./css/typingTittle.css";
import "animate.css";
import { useState } from "react";
import DynamicTableNavigator from "./components/DynamicTableNavigator";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleModal = () => {
    if (isModalOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsClosing(false);
      }, 500);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLogin = (userRole, username) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setUsername(username);
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    navigate("/");
  };

  return (
    <div
      className={`App ${isModalOpen && !isClosing ? "blur-background" : ""}`}
    >
      {isLoggedIn ? (
        <div className="header">
          <span>
            Logged in as: <strong>{username}</strong> ({role})
          </span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <NavigationButton onClick={toggleModal} />
      )}      <Outlet context={{ isLoggedIn, handleLogin}} />
      {/* <div className="center-container">
        <h1 className="typing-text">Ivan Zhuravlev database controller</h1>
      </div> */}
      <DynamicTableNavigator></DynamicTableNavigator>
      <NavigationButton onClick={toggleModal} />
      {!isLoggedIn && <NavigationButton onClick={toggleModal} />}
      <div className="main-content"></div>
      {isModalOpen && (
        <div className="modal">
          <div
            className={`modal-content animate__animated ${
              isClosing
                ? "animate__rotateOutUpRight"
                : "animate__rotateInUpRight"
            }`}
          >
            <button className="close-button" onClick={toggleModal}>
              <img src="../src/assets/cross.svg" width="19" height="19" />
            </button>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
