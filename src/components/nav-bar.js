const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles/nav-bar.css">

<div id = bar>
</div>
<div id = spacer></div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM tree to this instance - this creates ".shadowroot" for us
    this.attachShadow({ mode: 'open' });

    // Clone "template" and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Declare variables
    this.bar = this.shadowRoot.querySelector('#bar');

    let allTabs = [
      this.getAttribute('data-tab1'),
      this.getAttribute('data-tab2'),
      this.getAttribute('data-tab3'),
      this.getAttribute('data-tab4'),
      this.getAttribute('data-tab5'),
    ];

    for (let tab of allTabs) {
      if (tab != null) {
        let newTab = document.createElement('a');
        let infoSplit = tab.split('%');

        newTab.textContent = infoSplit[0];

        if (infoSplit[1][0] == '#') {
          newTab.onclick = () => (window.location = infoSplit[1]);
        } else {
          newTab.href = infoSplit[1];
        }

        this.bar.appendChild(newTab);
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  attributeChangedCallback(attributeName, oldVal, newVal) {
    //console.log(attributeName, oldVal, newVal);
    this.render();
  }

  static get observedAttributes() {
    return ['data-tab1', 'data-tab2', 'data-tab3', 'data-tab4', 'data-tab5'];
  }

  render() {
    // Grab the attribute values, and assign a default value if necessary
  }
} // End class

customElements.define('nav-bar', NavBar);
