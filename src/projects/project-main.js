"use strict";
import { travelTo } from "../helper.js";
import "../components/personal-project.js";

// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

// Get some page elements
let projArray;
// Declare variables
let openProj = -1;



init();



// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

function init () {
    // Get projects
    projArray = document.querySelectorAll("personal-project");
    loadJSON();
}

function loadJSON() {
    const fetchPromise = async () => {
        // Await ("stay on this line") until the first promise is resolved, meaning the data has downloaded
        let response = await fetch('data/projects.json');
  
        // If the response is not successful, throw an error
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
  
        // Await "(stay on this line)" until the second promise is resolved, meaning we now have a JSON object
        let json = await response.json();

        // Make the projects
        for (let i = 0; i < projArray.length; i++)
        {
            makeProject(projArray[i], json[projArray[i].dataset.index]);
        
            // Each project has a top buffer when traveled to
            projArray[i].style.scrollMarginTop = "1vw"; 
            // travelTo does have a buffer as well

            // These two need the same event listener
            // Why not target project? The hitbox ends up inaccurate
            projArray[i].banner.onclick = () => toggleDropdown(i);
            projArray[i].tab.onclick = () => toggleDropdown(i);
        }
    };
  
    // Call fetchPromise() and add a .catch() to it
    // This works because fetchPromise() is async and thus returns a promise!
    fetchPromise().catch(e => { console.log(`In catch with e = ${e}`); });
}

function makeProject(elem, data) {
    elem.dataset.id = data.id;
    elem.dataset.name = data.name;
    elem.dataset.subtitle = `<em>${data.subtitle}</em>`;
    elem.dataset.icon1 = data.icon1;
    elem.dataset.icon2 = data.icon2;

    // Figure out a better way to do this later
    elem.dataset.info = data.info.join("");

    // Add a css file if necessary
    if (data.css) {
        let css = document.createElement('link');
        css.rel = "stylesheet";
        css.href = data.css;
        elem.shadowRoot.appendChild(css);

//document.getElementsByTagName( "head" )[0].appendChild( link );
    }

    // Add a script if necessary
    if (data.script) {
        let script = document.createElement('script');
        script.src = data.script;
        script.type = "module";
        document.head.appendChild(script);
    }
}

// Toggle visibility of project information
function toggleDropdown(i) {
    let project = projArray[i]; // Declare element variable

    if (openProj == i)
    {
        project.close(); // Close this project
        openProj = -1;   // Update openProj
    }
    else
    {
        // Close the other open project (sans animation)
        if (openProj != -1) { projArray[openProj].close(); }
        
        project.open();       // Open this project
        openProj = i;         // Update openProj
        travelTo(project.id); // Travel to project
    }
}