const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles/index-styles.css">
<link rel="stylesheet" href="./styles/project-styles/project-main.css">
<div class='project'>
    <section class='banner'>
        <img class='icon1' src='../assets/sms-logo.png' alt=''>
        <div>
            <h3 class='name'>Title</h3>
            <p class='subtitle'><em>Subtitle</em></p>
        </div>
        <img class='icon2' src='../assets/sms-logo.png' alt=''>
    </section>
    <div class='dropdown'>
        <div class='info'>
        </div>
        <div class='tab'>
            <div class='arrow-down'></div>
        </div>
    </div>
</div>
`;

class PersonalProject extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM tree to this instance - this creates "".shadowroot" for us
    this.attachShadow({ mode: 'open' });

    // Clone "template" and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Declare variables
    this.banner = this.shadowRoot.querySelector('.banner');
    this.icon1 = this.shadowRoot.querySelector('.icon1');
    this.name = this.shadowRoot.querySelector('.name');
    this.subtitle = this.shadowRoot.querySelector('.subtitle');
    this.icon2 = this.shadowRoot.querySelector('.icon2');
    this.dropdown = this.shadowRoot.querySelector('.dropdown');
    this.info = this.shadowRoot.querySelector('.info');
    this.tab = this.shadowRoot.querySelector('.tab');
    this.arrow = this.tab.firstElementChild;

    // These two need the same event listeners
    // Why not target project? The hitbox ends up inaccurate
    const bannerAndTab = [this.banner, this.tab];
    // for...of loops are awesome
    for (let elem of bannerAndTab) {
      // Scale up and reveal tab
      elem.onmouseover = () => {
        if (this.info.style.display == '') {
          this.tab.style.animation = 'tabOut linear forwards .05s 0s 1 ';
        }
      };

      // Scale down and hide tab
      elem.onmouseleave = () => {
        if (this.info.style.display == '') {
          this.tab.style.animation = 'tabIn linear forwards .05s 0s 1 ';
        }
      };
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
    return [
      'data-index',
      'data-id',
      'data-name',
      'data-subtitle',
      'data-icon1',
      'data-icon2',
      'data-info',
    ];
  }

  render() {
    // Grab the attribute values, and assign a default value if necessary
    this.id = this.getAttribute('data-id');

    this.name.innerHTML = this.getAttribute('data-name')
      ? this.getAttribute('data-name')
      : 'Name';
    this.subtitle.innerHTML = this.getAttribute('data-subtitle')
      ? this.getAttribute('data-subtitle')
      : 'Subtitle';
    this.icon1.src = this.getAttribute('data-icon1')
      ? this.getAttribute('data-icon1')
      : './assets/sms-logo.png';
    this.icon2.src = this.getAttribute('data-icon2')
      ? this.getAttribute('data-icon2')
      : this.icon1.src;
    this.info.innerHTML = this.getAttribute('data-info')
      ? this.getAttribute('data-info')
      : 'I think something went wrong.';
  }

  open() {
    this.info.style.display = 'block';
    this.arrow.className = 'arrow-up';
  }

  close() {
    this.info.style.display = '';
    this.arrow.className = 'arrow-down';
    this.tab.style.animation = 'tabIn linear forwards .05s 0s 1 ';
  }
} // End class

customElements.define('personal-project', PersonalProject);
