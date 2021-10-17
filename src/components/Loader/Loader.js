import Template from "react-loader-spinner";

import s from "./Loader.module.scss";

const Loader = () => (
  <div className={s.Loader}>
    <Template type="TailSpin" color="#02be6e" height={100} width={100} />
  </div>
);

export default Loader;
