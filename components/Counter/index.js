const COUNTER_TEMPLATE = document.createElement("template");

COUNTER_TEMPLATE.innerHTML = `
    <link rel="stylesheet" href="components/Counter/index.css" type="text/css" >
    
    <div class="container">
        <h3>Counter Component</h3>

        <button class="add">Add</button> 
        <button class="substract">Substract</button>

        <p class="click-counter"></p>
    </div>
`;

class Counter extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM for component
    this.attachShadow({ mode: "open" });

    // Bind template for component shadow DOM
    this.shadowRoot.appendChild(COUNTER_TEMPLATE.content.cloneNode(true));

    // Properties
    this.addButton = this.shadowRoot.querySelector(".add");
    this.substractButton = this.shadowRoot.querySelector(".substract");
    this.clickCounter = this.shadowRoot.querySelector(".click-counter");
    this.counter = Number(this.getAttribute("counter")) || 0;

    // Assign props to template tags
    this.clickCounter.innerHTML = this.counter;
  }

  // Life Cicle
  static get observedAttributes() {
    return ["counter"];
  }

  connectedCallback() {
    this.addButton.addEventListener("click", this.addOne.bind(this));
    this.substractButton.addEventListener("click", this.subtractOne.bind(this));
  }

  disconectedCallback() {
    this.addButton.removeEventListener("click", this.addOne);
    this.substractButton.removeEventListener("click", this.subtractOne);
  }

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    name === "counter" && (this.clickCounter.innerHTML = newValue);
  }

  // Methods
  addOne() {
    this.counter++;
    this.setAttribute("counter", this.counter);
  }

  subtractOne() {
    this.counter--;
    this.setAttribute("counter", this.counter);
  }
}

window.customElements.define("click-counter", Counter);

//export default { name: "counter", component: Counter };
