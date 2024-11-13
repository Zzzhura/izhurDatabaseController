import "../css/navigationButton.css";
import menuIcon from '../assets/menu-burger.svg';
import PropTypes from "prop-types";

function NavigationButton({onClick}) {

  return (
    <button className="navigation-button" onClick={onClick}>
      <img src={menuIcon} alt="Menu" className="menu-icon" />
    </button>
  );
}

NavigationButton.PropTypes = {
  onClick: PropTypes.func.isRequired,
};
export default NavigationButton;
