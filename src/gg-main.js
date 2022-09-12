import "./basic-rules.js";
import "./components/gg-entry.js";
import "./components/gg-card.js";

// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

let showcase = document.querySelector("#showcase");
let cardComps = document.querySelectorAll("gg-card");
let arrangement = 0;

let entryComps;
const eGrps = [];

let eI = 0;    // Index of the current entry
let eGrpI = 0; // Index of the current entry group

init();

// -------------------------------------
// - - - - - L I S T E N E R S - - - - -
// -------------------------------------
updateCardScale();
window.onresize = updateCardScale;
function updateCardScale() {
  document.documentElement.style.setProperty('--scale', Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 100 + "px");
}

// Hide the showcase when the filter is clicked
document.querySelector(".filter").onclick = () => { showcase.style.display = "none"; };

// Tell the document to listen to key presses
document.addEventListener(
  'keydown', 
  function keyFunctions(key) {
    if (key.code == "bingus") {}
    else if (key.code == "ArrowLeft")  { fileThrough(-1); } // Left arrow moves card left 
    else if (key.code == "ArrowRight") { fileThrough(1);  } // Right arrow moves card right
    else if (key.code == "Escape") // Escape exits showcase
      if (showcase.style.display == "block")
        showcase.style.display = "none";
  }
);



// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

function init() {
  entryComps = document.querySelectorAll("gg-entry, delta-entry");
  loadJSON();

  // Open the showcase when icon art is clicked
  for (let i = 0; i < entryComps.length; i++)
    entryComps[i].onclick = () => showCards(i);

  // Create entry groups
  let placedEntries = 0;
  for (let g of document.querySelectorAll(".entryGroup")) {
    let gEntries = g.querySelectorAll("gg-entry, delta-entry");
    if (gEntries.length > 0) {
      eGrps.push(makeEntryGroup(g, placedEntries, placedEntries + gEntries.length - 1));
      placedEntries += gEntries.length;
    }
  }
}



function showCards(i) {
  eI = i;                             // Set the entry index
  arrangement = 0;                    // Set card arrangement and settle
  settleCards(cardComps[0], cardComps[1], cardComps[2]);
  for (const c of cardComps)          // Reset card animations
    c.card.style.animation = "";

  eGrpI = findGroup(eI);              // Set the entry group index
  showcase.style.display = "block";   // Actually display the deck
  cardComps[0].paint(entryComps[eI]); // Scroll padding doesn't work if not visible
}

// Finds and returns an entry group index based on an entry index
function findGroup(eI) {
  let grpI = 0;
  for (let grp of eGrps) {
    if (eI <= grp['eI-end'] && eI >= grp['eI-start'])
      return grpI;
    
    grpI++;
  }
}

// ONLY USE -1 AND 1 FOR SHIFT
function fileThrough(shift) {
  for (const c of cardComps)
    c.card.style.animation = "placeholder .5s forwards ease 1";

  eI += shift;
  if      (eI > eGrps[eGrpI]['eI-end'])   { eI = eGrps[eGrpI]['eI-start']; }
  else if (eI < eGrps[eGrpI]['eI-start']) { eI = eGrps[eGrpI]['eI-end'];   }
  
  if      (arrangement == 0) { rearrangeCards(shift, cardComps[0], cardComps[1], cardComps[2]); }
  else if (arrangement == 1) { rearrangeCards(shift, cardComps[1], cardComps[2], cardComps[0]); }
  else if (arrangement == 2) { rearrangeCards(shift, cardComps[2], cardComps[0], cardComps[1]); }

  arrangement += shift;

  if (arrangement > 2)
    arrangement = 0;
  if (arrangement < 0)
    arrangement = 2;


    console.log('group index: ', eGrpI, ', entry index: ', eI);
}

function rearrangeCards(shift, cTop, cMid, cBot) {
  if (shift == 1) {
    cMid.paint(entryComps[eI]);      // Update info on middle card
    cTop.card.style.animationName = "topToBot"; // Move top card to bottom
    cMid.card.style.animationName = "midToTop"; // Move middle card to top
    cBot.card.style.animationName = "botToMid"; // Move bottom card to middle
  }
  else if (shift == -1) {
    cBot.paint(entryComps[eI]);      // Update info on bottom card
    cTop.card.style.animationName = "topToMid"; // Move top card to middle
    cMid.card.style.animationName = "midToBot"; // Move middle card to bottom
    cBot.card.style.animationName = "botToTop"; // Move bottom card to top
  }

  // Solidify new css styles
  settleCards(cTop, cMid, cBot);        
}
// Arranges display cards in the same order as the parameter
function settleCards(cTop, cMid, cBot) {
  cTop.card.style.left = "calc(var(--scale) * -4)"; 
  cTop.card.style.top = "calc(var(--scale) * -4)"; 
  cTop.card.style.zIndex = "2";
  cTop.card.style.filter = "brightness(100%)";

  cMid.card.style.left = "0px";
  cMid.card.style.top = "0px";
  cMid.card.style.zIndex = "1";
  cMid.card.style.filter = "brightness(80%)";

  cBot.card.style.left = "calc(var(--scale) * 4)";
  cBot.card.style.top = "calc(var(--scale) * 4)";
  cBot.card.style.zIndex = "0";
  cBot.card.style.filter = "brightness(60%)";
}

function loadJSON() {
  const fetchPromise = async () => {
    // Await ("stay on this line") until the first promise is resolved, meaning the data has downloaded
    let response = await fetch('data/gg-entries.json');

    // If the response is not successful, throw an error
    if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }

    // Await "(stay on this line)" until the second promise is resolved, meaning we now have a JSON object
    let json = await response.json();

    for (let entry of entryComps)
      makeEntry(entry, json[entry.dataset.id]);
  };

  // Call fetchPromise() and add a .catch() to it
  // This works because fetchPromise() is async and thus returns a promise!
  fetchPromise()
  .catch(e => {
    console.log(`In catch with e = ${e}`);
  });
};


function makeEntry(elem, data) {
  elem.dataset.name = data.name;

  if (data.trim == "") { elem.dataset.trim = "#BBBBBB"; }
  else                 { elem.dataset.trim = data.trim; }

  elem.dataset.icon = data.icon;
  elem.dataset.image = data.image;

  // Copy description over to a temp variable
  let tempDes = data.description;
  // Run through the array
  for (let i = 0; i < tempDes.length; i++) { // "for... of" loop doesn't work... why?
    tempDes[i] = symbolToSpan(tempDes[i], '*', 'trim');
    tempDes[i] = symbolToSpan(tempDes[i], '~', 'delta');
  }

  // Combine all into one string with tags
  elem.dataset.description = tempDes.map(p => `<p>${p}</p>`).join("<br>");;
}

// Takes in a string, replaces symbols with a span with specified class name
function symbolToSpan(par, symbol, className) {
    // Split paragraph by specified symbol
    let splitPar = par.split(symbol);

    // Run through the split paragraph
    for (let i = 1; i < splitPar.length; i += 2)
    // Put what was inside the symbols into a span with specified class name
        splitPar[i] = `<span class='${className}'>${splitPar[i]}</span>`;
    
    // Combine paragraph back into one string and return
    return splitPar.join("");
}

// Returns an entry group object
function makeEntryGroup(elem, eIStart, eIEnd) {
  return {
    "elem": elem,
    "eI-start": eIStart,
    "eI-end": eIEnd
  }
}