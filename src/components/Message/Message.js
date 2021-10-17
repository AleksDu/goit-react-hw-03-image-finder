import PropTypes from "prop-types";
import s from "./Message.module.scss";

const Message = ({ children }) => <div className={s.Message}>{children}</div>;

Message.defaultProps = {
  children: [],
};

Message.propTypes = {
  children: PropTypes.node,
};

export default Message;
