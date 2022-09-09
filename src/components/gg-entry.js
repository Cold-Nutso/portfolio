const template = document.createElement("template");
template.innerHTML = `
<style>
    img {
        width: 100%;
        height: 100%;
        transition: transform .2s;
    }
    img:hover { 
        cursor: pointer; 
        transform: scale(1.2);
    }
</style>

<img src="" alt ="">
`;

class GGEntry extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM tree to this instance - this creates ".shadowroot" for us
        this.attachShadow({mode: "open"});

        // Clone "template" and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Declare variables
        this.icon = this.shadowRoot.querySelector("img");
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
        return ["data-id", "data-name", "data-trim", "data-icon", "data-image", "data-description"];
    }

    render() {
        // Grab the attribute values, and assign a default value if necessary
        const iconUrl = this.getAttribute("data-icon") ? this.getAttribute("data-icon") : "media/sms-logo.png";
        this.icon.src= iconUrl;
    }


} // End class

customElements.define("gg-entry", GGEntry);


class DeltaEntry extends GGEntry {
    titleIndex = 0;
    titles = [
        "Delta",
        "Delta Effect",
        "Delta Clause",
        "Delta Phenomenon",
        "Delta Pressure",
        "Delta Tension",
        "Delta Influence",
    ];
    defIndexA = 0;
    defIndexB = 1;
    defs = [
        "alteration",
        "uncertainty",
        "change yet to come",
        "instability",
        "reimagining",
        "impermanent attributes",
        "unsettled features",
    ];

    randomize() {
        // Get a new title
        let newTitle = Math.floor(Math.random() * this.titles.length);
        if (newTitle == this.titleIndex) { newTitle++;  }
        
        // Reset title with the new index
        this.setAttribute("data-name", this.titles[newTitle]);

        // Get new definitions
        let newDefA = Math.floor(Math.random() * this.defs.length);
        if (newDefA == this.defIndexA)   { newDefA++;   }
        let newDefB = Math.floor(Math.random() * this.defs.length);
        if (newDefB == this.defIndexB)   { newDefB++;   }
        if (newDefB == newDefA)          { newDefB++;   }
        if (newDefB >= this.defs.length) { newDefB = 0; }

        // Reset description with the new definitions
        let description = this.getAttribute("data-description");
        let dSplit = description.split("<span class='trim'>");
        let dSplit1 = dSplit[1].split("</span>");
        let dSplit2 = dSplit[2].split("</span>");
        dSplit1[0] = `<span class='trim'>${this.defs[newDefA]}</span>`;
        dSplit2[0] = `<span class='trim'>${this.defs[newDefB]}</span>`;
        let dString = dSplit[0] + dSplit1.join("") + dSplit2.join("");
        this.setAttribute("data-description", dString);
        
        // Finally, render
        this.render();
    }

} // End class

customElements.define("delta-entry", DeltaEntry);