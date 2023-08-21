// Imports
import "./../basic-rules.js";
import { hues, initHues } from "./gg-hues.js";
import { sentients, initSentients } from "./gg-sentients.js";
import { vikings, initVikings } from "./gg-vikings.js";



// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

// Grabs 'gg-data.json' and distributes info into arrays
const loadGGData = async () => { 
  try {
    // Fetch JSON file
    let response = await fetch('data/gg-data.json');
    // Throw error if necessary
    if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
    // Get JSON object from file
    let json = await response.json();

    // Write to sentients array
    for (let i=0; i<json.sentients.length; i++) { sentients[i] = json.sentients[i]; }
    // Write to hues array
    for (let i=0; i<json.hues.length; i++) { hues[i] = json.hues[i]; }
    // Write to vikings array
    for (let i=0; i<json.vikings.length; i++) { vikings[i] = json.vikings[i]; }

  } catch (err) { console.log(`${err}`); } 
};

// Initialization
const init = async () => {
  await loadGGData();
  initHues();
  initSentients();
  initVikings();
}



// -----------------------------------------
// - - - - - A C T U A L   C O D E - - - - -
// -----------------------------------------

init();