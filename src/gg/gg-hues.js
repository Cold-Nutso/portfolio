// Imports
import { bubbleLetters, buildSelect, colorString, scrollbarPadding  } from "./gg-helper.js";



// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

const huesData = []; // "Hue" objects read from a json file
let activeIndex = -1; // Current active hue index
let trim = getComputedStyle(document.documentElement).getPropertyValue('--default-trim');

// Grab elements
const huesElem = document.querySelector("#hues");
const selectElem = huesElem.querySelector(".select");
const buttonsElem = selectElem.querySelector(".buttons");
const contentElem = huesElem.querySelector(".content");
const txtScrn = contentElem.querySelector(".textScreen");
const descPar = contentElem.querySelector("p");




// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

const updateText = () => {
    const obj = huesData[activeIndex]; // Save data as variable
    let htmlString = ''; // Start an html string

    // Write the title
    htmlString += colorString(`// ${obj.name.charAt(0).toUpperCase() + obj.name.slice(1)} //`, trim);

    // Write the rest
    for (let i=0; i<obj.description.length; i++) {
        htmlString += `<br><br>&nbsp;&nbsp;&nbsp;`;

        let contentStr = colorString(obj.description[i], trim, '*');
        htmlString += colorString(contentStr, "#AF7DFF", '^');
    }
    for (let i=0; i<obj.design.length; i++) {
        htmlString += `<br><br>&nbsp;&nbsp;&nbsp;`;

        let contentStr = colorString(obj.design[i], trim, '*');
        htmlString += colorString(contentStr, "#AF7DFF", '^');
    }
    descPar.innerHTML = htmlString;

    scrollbarPadding(txtScrn); // Handle scrollbar
}

// Writes information to the content section
const updateContent = (index) => {
    // Don't reload the same data
    if (index == activeIndex) { return; }
    
    activeIndex = index; // Update activeIndex
    const obj = huesData[index]; // Save data as variable 
    
    // Reassign trim color
    if (!obj.hex) { 
        trim = getComputedStyle(document.documentElement).getPropertyValue('--default-trim'); 
    } else { trim = obj.hex; }
    
    updateText();
};

// Initialization
const init = () => {
    buildSelect(buttonsElem, huesData, 'hue', updateContent);
    updateContent(0);
};



// Exports
export {
    huesData as hues,
    init as initHues,
};