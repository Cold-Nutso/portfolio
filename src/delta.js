"use strict";

// -----------------------------
// - - - - - VARIABLES - - - - -
// -----------------------------

const titles = [
    "Delta",
    "Delta Effect",
    "Delta Clause",
    "Delta Phenomenon",
    "Delta Pressure",
    "Delta Tension",
    "Delta Influence",
];

const defs = [
    "alteration",
    "uncertainty",
    "change yet to come",
    "instability",
    "reimagining",
    "impermanent attributes",
    "unsettled features",
];



// -----------------------------
// - - - - - FUNCTIONS - - - - -
// -----------------------------

function deltaMode() {
    let deltaList = document.querySelectorAll(".delta");

    for (let i = 0; i < deltaList.length; i++) {
        // If element is an image, put a stamp over it
        if (deltaList[i].tagName == "IMG")
        {
            deltaList[i].style.backgroundImage = `url('${deltaList[i].src}')`;
            deltaList[i].src = "media/delta-stamp.svg";
            // deltaList[i].style.filter = "drop-shadow(0px 0px 10px rgba(175, 125, 255, 1))";
        }
        // Otherwise, just change the color
        else
            deltaList[i].style.color = "#AF7DFF";
    }
}