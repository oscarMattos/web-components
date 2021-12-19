import * as Counter from "./Counter";
import * as UserCard from "./UserCard";

const componentes = [Counter, UserCard];

componentes.forEach(({ name, component }, index) =>
  window.customElements.define(name, component)
);
