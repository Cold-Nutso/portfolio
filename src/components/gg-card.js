const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="styles/gg-card.css">

<div id='card'>
    <img id='image' src="">
    <div id='name'>Oops!</div>
    <div id='description'>Something went wrong.</div>
</div>
`;

class GGCard extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM tree to this instance - this creates ".shadowroot" for us
        this.attachShadow({mode: "open"});

        // Clone "template" and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Declare variables
        this.card = this.shadowRoot.querySelector("#card");
        this.image = this.shadowRoot.querySelector("#image");
        this.name = this.shadowRoot.querySelector("#name");
        this.description = this.shadowRoot.querySelector("#description");
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        //console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes() {
        return [];
    }

    render() {
        // Grab the attribute values, and assign a default value if necessary
    }

    paint(ggEntry) {
        if (ggEntry.nodeName == 'DELTA-ENTRY')
            ggEntry.randomize();

        // Assign values to children
        this.image.src = ggEntry.dataset.image;
        // cardImg.style.backgroundImage = entryElems[eI].children[2].style.backgroundImage; // Use background image from 3rd child
        // cardImg.style.filter = entryElems[eI].children[2].style.filter;                   // Use filter from 3rd child
        this.description.innerHTML = ggEntry.dataset.description;
        this.description.scrollTop = 0;                               

        // Color the title, 'trim' classes, and 'delta' classes in description
        this.name.style.color = ggEntry.dataset.trim;
        for (let bit of this.description.querySelectorAll(".trim"))  { bit.style.color = ggEntry.dataset.trim; }
        for (let bit of this.description.querySelectorAll(".delta")) { bit.style.color = "#AF7DFF"; }

        // Decrease font size until title fits
        this.name.style.fontSize = "7vh"            // Set font size to default 7vh
        this.name.innerHTML = "...";                // Set text to something tiny (so it doesn't stretch column width)
        let idealWidth = this.name.clientWidth;     // Get ideal column width
        this.name.innerHTML = ggEntry.dataset.name; // Set text back to what it should be

        let goodEnough = false; // Conditional for while loop
        while (!goodEnough) {
            let currentWidth = this.name.clientWidth;                                      // Get current column width
            let currentFontSize = parseFloat(window.getComputedStyle(this.name).fontSize); // Get float of current font size

            if (currentWidth > idealWidth)
                this.name.style.fontSize = `${currentFontSize * (idealWidth / currentWidth )}px`; // Change font size by factor of current/ideal width
            else {
                this.name.style.fontSize = `${currentFontSize - .1}px` // Decrease font size once more for good measure
                goodEnough = true;                                     // End the loop
            }
        }

        this.setScrollPadding();
    }
    
    // Check if there's a scrollbar, then add padding to paragraphs
    setScrollPadding() {
        if (this.description.scrollHeight > this.description.clientHeight)
            for (let par of this.description.children)
                par.style.paddingRight = "calc(var(--scale) * 2)";
    }
} // End class

customElements.define("gg-card", GGCard);