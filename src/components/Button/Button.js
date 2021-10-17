import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ onClick }) => (
  <div className={s["Button-wrapper"]}>
    <button type="button" className={s.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.prototypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
