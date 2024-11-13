import toggleModal from "../App";

function CloseButton() {
  return (
    <button className="close-button" onClick={toggleModal}>
      <img src="../src/assets/cross.svg" width="19" height="19" />
    </button>
  );
}

export default CloseButton;
