import LoginForm from "./components/LoginForm";
import NavigationButton from "./components/NavigationButton";
import "./css/main.css";
import "./css/typingTittle.css";
import "animate.css";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <div
      className={`App ${isModalOpen && !isClosing ? "blur-background" : ""}`}
    >
      <div className="center-container">
        <h1 className="typing-text">Ivan Zhuravlev database controller</h1>
      </div>
      <NavigationButton onClick={toggleModal} />
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
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
