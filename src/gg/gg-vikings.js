// Imports
import { buildSelect, buildArtZoom, resetArtZoom, colorString, scrollbarPadding } from "./gg-helper.js";

// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

const vikingsData = []; // "Viking" objects read from a json file
let activeIndex = -1; // Current active viking index
let artIndex = -1; // Current active art index
let artGlow = true; // Determines image outline
let activeText = 'bio';
let trim = getComputedStyle(document.documentElement).getPropertyValue('--default-trim');

// Grab elements
const vikingsElem = document.querySelector("#vikings");
const contentElem = vikingsElem.querySelector(".content");
const txtScrn = contentElem.querySelector(".textScreen");
const descPar = contentElem.querySelector(".description p");
const artImage = contentElem.querySelector(".art img");
const buttonsElem = vikingsElem.querySelector(".select .buttons");
const contBtnsElem = vikingsElem.querySelector(".content .select .buttons");

// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

const buildSelectButton = (elem, name, val, func, src, checked = false) => {
        // Create radio button
        let rad = document.createElement("input");
        rad.setAttribute("type", "radio");
        rad.id = `${name}Opt${val}`;
        rad.name = `${name}Options`;
        rad.value = val;

        rad.checked = checked; // Set checked value
        // Add event listener
        // Not reloading the same data must be handled in func
        rad.onclick = () => { if (rad.checked) { func(rad.value); } };

        // Create label
        let radLbl = document.createElement("label");
        radLbl.setAttribute("for", rad.id);

        // Create Image
        let radDiv = document.createElement("div");
        let radImg = document.createElement("img");
        radImg.src = src;
        radImg.draggable = false;

        // Append everything
        elem.append(rad);
        radDiv.append(radImg);
        radLbl.append(radDiv);
        elem.append(radLbl);
};

const buildTextSelect = (elem, func) => {
    buildSelectButton(elem, 'text', 'bio', func, 'media/pictographs/card.svg', true);
    buildSelectButton(elem, 'text', 'story', func, 'media/pictographs/book.svg');
    buildSelectButton(elem, 'text', 'notes', func, 'media/pictographs/note.svg');
};

const updateText = (text) => {
    activeText = text; // Update activeText
    const obj = vikingsData[activeIndex]; // Save data as variable
    let htmlString = ''; // Start an html string

    // Write the rest
    for (let i=0; i<obj[`${text}`].length; i++) {
        if (i > 0) {
            htmlString += `<br><br>&nbsp;&nbsp;&nbsp;`;

            let contentStr = colorString(obj[`${text}`][i], trim, '*');
            htmlString += colorString(contentStr, "#AF7DFF", '^');
        } else {     
            htmlString += '// ';

            let contentStr = colorString(obj[`${text}`][i], trim, '*');
            htmlString += colorString(contentStr, "#AF7DFF", '^');

            htmlString += ' //';
        }
    }
    descPar.innerHTML = htmlString;

    scrollbarPadding(txtScrn); // Handle scrollbar
}

// Toggles the drop shadow on the artwork
const toggleGlow = () => {
    artGlow = !artGlow; // Swap boolean value

    // Update drop shadow
    if (artGlow) { artImage.style.filter = `drop-shadow(0px 0px 3px ${trim})`; }
    else { artImage.style.filter = 'none'; }
}

// Displays the next artwork in the array
const cycleArt = () => {
    artIndex += 1; // Increment art index
    const obj = vikingsData[activeIndex]; // Grab current data object

    // Loop to beginning of array when necessary
    if (artIndex >= obj.art.length) { artIndex = 0; }

    // Update image element
    artImage.src = obj.art[artIndex];
}

// Writes information to the content section
const updateContent = (index) => {
    // Don't reload the same data
    if (index == activeIndex) { return; }
    
    activeIndex = index; // Update activeIndex
    const obj = vikingsData[index]; // Save data as variable 
    
    // Reassign trim color
    if (!obj.hex) { 
        trim = getComputedStyle(document.documentElement).getPropertyValue('--default-trim'); 
    } else { trim = obj.hex; }
    
    updateText(activeText);

    // Reset art
    artIndex = -1;
    cycleArt();
    resetArtZoom(artImage);
    
    // Retain glow status
    artGlow = !artGlow;
    toggleGlow();
};

// Initialization
const init = () => {
    buildSelect(buttonsElem, vikingsData, 'viking', updateContent);
    buildTextSelect(contBtnsElem, updateText)

    updateContent(0);

    window.onresize = () => {
        scrollbarPadding(txtScrn);
    }

    // Handle art image events
    artImage.onclick = cycleArt;
    artImage.oncontextmenu = (e) => {
        e.preventDefault();
        toggleGlow();
    };
    buildArtZoom(artImage, 3, .1);
};



// Exports
export {
    vikingsData as vikings,
    init as initVikings,
};