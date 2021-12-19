const USER_CARD_TEMPLATE = document.createElement("template");

USER_CARD_TEMPLATE.innerHTML = `
    <link rel="stylesheet" href="components/UserCard/index.css" type="text/css" >
    
    <div class="container">
        <h3>User Card Component</h3>

        <ul class="user-data">
            <li class="name"></li>
            <li class="last-name"></li>
        </ul>

        <button class="button"></button>
    </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM for component
    this.attachShadow({ mode: "open" });

    // Bind template for component shadow DOM
    this.shadowRoot.appendChild(USER_CARD_TEMPLATE.content.cloneNode(true));

    // Properties
    this.userData = this.shadowRoot.querySelector(".user-data");
    this.name = this.shadowRoot.querySelector(".name");
    this.lastName = this.shadowRoot.querySelector(".last-name");
    this.button = this.shadowRoot.querySelector(".button");
    this.showOptions = /true/.test(this.getAttribute("show-options"));

    // Assign props to template tags
    this.name.innerHTML = this.getAttribute("name");
    this.lastName.innerHTML = this.getAttribute("last-name");
    this.button.innerHTML = this.showOptions
      ? "Mostrar Opciones"
      : "Ocultar Opciones";
  }

  // Life Cicle
  static get observedAttributes() {
    return ["show-options"];
  }

  connectedCallback() {
    this.button.addEventListener("click", this.showToggle.bind(this));
  }

  disconectedCallback() {
    this.button.removeEventListener("click", this.showToggle);
  }

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `name: ${name} - oldValue: ${oldValue} - newValue: ${newValue}`
    );

    name === "show-options" &&
      (() => {
        if (this.showOptions) {
          this.userData.style.display = "block";
          this.button.innerHTML = "Ocultar Opciones";
        } else {
          this.userData.style.display = "none";
          this.button.innerHTML = "Mostrar Opciones";
        }
      })();
  }

  // Methods
  showToggle() {
    this.showOptions = !this.showOptions;
    this.setAttribute("show-options", this.showOptions);
  }
}

window.customElements.define("user-card", UserCard);

//export default { name: "user-card", component: UserCard };
