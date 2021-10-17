import PropTypes from "prop-types";
import s from "./IconButton.module.scss";

const IconButton = ({ children, onclick, ...allyProps }) => (
  <button
    type="button"
    className={s.IconButton}
    onClick={onclick}
    {...allyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  onclick: () => null,
  children: null,
};

IconButton.propTypes = {
  onclick: PropTypes.func,
  children: PropTypes.node,
  "aria-label": PropTypes.string.isRequired,
};

export default IconButton;
