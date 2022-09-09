"use strict";

// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

// Get some page elements
let projArray = document.querySelectorAll(".project");

// Declare variables
let openProj = -1;





// -------------------------------------
// - - - - - B A S E - C O D E - - - - -
// -------------------------------------

// Each project has a top buffer when traveled to
for (let i = 0; i < projArray.length; i++)
    projArray[i].style.scrollMarginTop = "1vw";





// -------------------------------------
// - - - - - L I S T E N E R S - - - - -
// -------------------------------------

// Add event listeners to project elements
for (let i = 0; i < projArray.length; i++)
{
    // Declare element variables
    let project = projArray[i];
    let banner = project.querySelector(".banner");
    let info = project.querySelector(".info");
    let tab = project.querySelector(".tab");
    
    // These two need the same event listeners
    // Why not target project? The hitbox ends up inaccurate
    let bannerAndTab = [banner, tab];
    // for...of loops are awesome
    for (const elem of bannerAndTab)
    {
        // Scale up and reveal tab
        elem.onmouseover = () => {
            if (info.style.display == "") {
                tab.style.animation = "tabOut linear forwards .05s 0s 1 "; 
        } };
        
        // Scale down and hide tab
        elem.onmouseleave = () => {
            if (info.style.display == "") {
                tab.style.animation = "tabIn linear forwards .05s 0s 1 ";               
        } };

        // Toggle info display
        elem.onclick = () => toggleDropdown(i);
    }
}

// Add listener to worms project profile
let wormsImg = document.querySelector("#worms1");
wormsImg.addEventListener( "click", 
function() { 
    wormsImg.src = "media/projects/champion_of_worms/profile-alt.png";
    wormsImg.style.cursor = "default";
    } 
);






// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

// Toggle visibility of project information
function toggleDropdown(i) {
    // Declare element variable
    let project = projArray[i];
    let tab = project.querySelector(".tab");

    if (openProj == i)
    {
        // Close the project
        project.querySelector(".info").style.display = "";
        project.querySelector(".triangle").style.transform = "rotate(180deg)";
        tab.style.animation = "tabIn linear forwards .05s 0s 1 "; 

        // Update openProj
        openProj = -1;
    }
    else
    {
        // Close the other open project (sans animation)
        if (openProj != -1) {
            projArray[openProj].querySelector(".info").style.display = "";
            projArray[openProj].querySelector(".triangle").style.transform = "rotate(180deg)";
            projArray[openProj].querySelector(".tab").style.animation = "tabIn linear forwards 0s 0s 1 ";
        }
        
        // Open this project
        project.querySelector(".info").style.display = "block";
        project.querySelector(".triangle").style.transform = "rotate(0deg)";

        // Update openProj
        openProj = i;

        // Travel to project
        travelTo(project.id);
    }
}