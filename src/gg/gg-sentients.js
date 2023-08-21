// Imports
import { bubbleLetters, buildSelect } from "./gg-helper.js";



// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

// List all possible trait keys a "sentient" json object may have
const traitKeys = [ "biology", "height", "skin", "hair", "crop", "horns", "head", "eyes", "tail", "legs", "feet", "nails" ];
const descripComments = [ "general", "stereotypes" ];
const sentientData = []; // "Sentient" objects read from a json file
let activeIndex = -1; // Current active sentient index

// Grab elements
const sentiElem = document.querySelector("#sentients");
const selectElem = sentiElem.querySelector(".select");
const buttonsElem = selectElem.querySelector(".buttons");
const contentElem = sentiElem.querySelector(".content");
const traitPar = contentElem.querySelector("#traits p");
const descriPar = contentElem.querySelector(".description p");



// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

// Builds a paragraph element based on a trait and category
const buildTraitLine = (trait, category) => {
    if (category) { return `<strong style='color:#777777'>${category}:</strong> ${trait}`; }
    else { return `${trait}`; }
};

// Handles structure of trait info based on name and array length
const writeTrait = (obj, key) => {
    // If property doesn't exist, return
    if (!obj[`${key}`]) { return null; }

    // Initialize innerHTML string
    let innerHTML = ``;
    innerHTML += `<span style='color:var(--comment-color)'>// ${key.toUpperCase()} //</span><br>`;
    let val = obj[`${key}`];

    // Otherwise, big ol' switch statement
    switch (key) {
        case "biology":
            innerHTML += buildTraitLine(val[0], 'class');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'reproduction'); }
            break;

        case "height":
            if (val[1]) { 
                innerHTML += buildTraitLine(val[0], 'male');
                innerHTML += '<br>' + buildTraitLine(val[1], 'female');
            } else { innerHTML += buildTraitLine(val[0]); }
            break;
        
        case "skin":
            innerHTML += buildTraitLine(val[0], 'color');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'texture'); }
            if (val[2]) { innerHTML += '<br>' + buildTraitLine(val[2], 'properties'); }
            break;

        case "hair":
            innerHTML += buildTraitLine(val[0], 'color');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'location'); }
            if (val[2]) { innerHTML += '<br>' + buildTraitLine(val[2], 'properties'); }
            break;

        case "crop":
            innerHTML += buildTraitLine(val[0], 'composition');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'location'); }
            if (val[2]) { innerHTML += '<br>' + buildTraitLine(val[2], 'properties'); }
            break;
        
        case "horns":
            innerHTML += buildTraitLine(val[0], 'location');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'structure'); }
            break;

        case "head":
            innerHTML += buildTraitLine(val[0], 'face');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'ears'); }
            if (val[2]) { innerHTML += '<br>' + buildTraitLine(val[2], 'nose'); }
            if (val[3]) { innerHTML += '<br>' + buildTraitLine(val[3], 'teeth'); }
            if (val[4]) { innerHTML += '<br>' + buildTraitLine(val[4], 'tongue'); }
            break;

        case "eyes":
            innerHTML += buildTraitLine(val[0], 'pupil');
            if (val[1]) { innerHTML += '<br>' + buildTraitLine(val[1], 'iris'); }
            if (val[2]) { innerHTML += '<br>' + buildTraitLine(val[2], 'properties'); }
            break;
    
        case "tail":
            if (!val[1]) { innerHTML += buildTraitLine(val[0]); }
            else {
                innerHTML += buildTraitLine(val[0], 'width');
                innerHTML += '<br>' + buildTraitLine(val[1], 'length');
                if (val[2]) { innerHTML += '<br>' + buildTraitLine(val[2], 'properties'); }
            }
            break;

        default:
            innerHTML += buildTraitLine(val);
            break;
    }

    // Return string
    return innerHTML;
};

// Handles structure of description info
const writeDescrip = (array) => {
    let innerHTML = ``; // Start innerHTML string

    // Write the description info
    for (let i=0; i<array.length; i++) {
        if (descripComments[i]) {
            innerHTML += `<span style='color:var(--comment-color)'>// ${descripComments[i].toUpperCase()} //</span><br>`;
        }
        innerHTML += array[i] + '<br><br>';
    }
    
    return innerHTML; // Return string
};

// Writes information to the content section
const updateContent = (index) => {
    // Don't reload the same data
    if (index == activeIndex) { return; };
    
    const obj = sentientData[index]; // Save data as variable
    let htmlString = ''; // Start an HTML string

    // Write the trait info
    for (let k of traitKeys) {
        let trait = writeTrait(obj, k);
        if (trait) {
            if (htmlString != '') { htmlString += '<br><br>'; }
            htmlString += writeTrait(obj, k);
        }
    }
    traitPar.innerHTML = htmlString

    // Write the description
    htmlString = '';
    for (let i=0; i<obj.description.length; i++) {
        if (i > 0 && htmlString.length > 0) { htmlString += '<br><br>'; }
        htmlString += `${obj.description[i]}`;
    }
    descriPar.innerHTML = writeDescrip(obj.description);

    // Update activeIndex
    activeIndex = index; 
};

// Initialization
const init = () => {
    buildSelect(buttonsElem, sentientData, 'sentient', updateContent);
    updateContent(0);
};



// Exports
export {
    sentientData as sentients,
    init as initSentients,
};




