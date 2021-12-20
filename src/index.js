import "./index.css";
import Counter from "./components/Counter";
import UserCard from "./components/UserCard";

const components = [Counter, UserCard];

window && components.forEach(({ name, component }, index) => {
  window.customElements.define(name, component);
});
