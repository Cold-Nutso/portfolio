"use strict";

// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

// Declare a bank of subtitles
let subtitles = [
    "Stick to the rules, <span class = trim>butterboy</span>.",
    "Stick Figure Badminton 3 enthusiast",
    "Connect Four god",
    "I might call you a bingus",
    "Ex-Camp Counselor",
    "Extremely cool individual",
    "Huge fan of apes",
    "Founder of Sea Monkey Studios",
    "Certified tall person",
    "Relatively incredible",
    "Occasional graphic designer",
    "Embracer of rain",
    "Technically a Lord",
    "Champion of worms",
    "Robot sympathizer",
    "Slightly amphibious",
    "AI rights activist",
    "Bionicle expert"
];

// Declare a bank of trim colors
let colors = [ 
    "#2CFF5E", 
    "#8FF4FF", 
    "#FDA6FF", 
    "#FFE41D" 
];
// Bank of filters corresponds to bank of trim colors
// Filters calculated with https://codepen.io/sosuke/pen/Pjoqqp
let filters = [
    "invert(89%) sepia(31%) saturate(1734%) hue-rotate(63deg)  brightness(113%) contrast(103%)", // 0.0 accuracy loss
    "invert(87%) sepia(19%) saturate(1143%) hue-rotate(155deg) brightness(102%) contrast(101%)", // 0.0 accuracy loss
    "invert(83%) sepia(93%) saturate(7452%) hue-rotate(254deg) brightness(102%) contrast(103%)", // 2.4 accuracy loss
    "invert(99%) sepia(49%) saturate(6062%) hue-rotate(334deg) brightness(101%) contrast(103%)"  // 0.1 accuracy loss
]
// Trim index determines which color will be used for trimming
let trimIndex = 0;

// Get some page elements
let menu = document.querySelector("#menu");
let trimImgs = document.querySelectorAll(".trimfilter");





// -------------------------------------
// - - - - - B A S E   C O D E - - - - -
// -------------------------------------



// -------------------------------------
// - - - - - L I S T E N E R S - - - - -
// -------------------------------------



// -------------------------------------
// - - - - - F U N C T I O N S - - - - -
// -------------------------------------

// When the window loads: 
// - Calculate my age
// - Display a subtitle
window.onload = (e) => {
    // - - - TRIM COLOR - - -

    // Pick a random trim index
    let trimIndex = Math.floor(Math.random() * colors.length);
    // Set trim color value
    document.documentElement.style.setProperty('--trim-color', colors[trimIndex]);
    // Filter all trim images
    for (let i = 0; i < trimImgs.length; i++)
    {
        // Add a drop shadow if it's a banner image
        if (trimImgs[i].parentElement.className == "banner")
            trimImgs[i].style.filter = filters[trimIndex] + " drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.6))";
        else
            trimImgs[i].style.filter = filters[trimIndex];
    }



    // - - - AGE BLURB - - -

    // Declare all age variables
    let birthdate = new Date(2002, 2, 15);  // For some godforsaken reason, only months are 0 based
    let thisdate = new Date();
    let yearText = "years";
    let monthText = "months";
    let dayText = "days";
    let ageText = "I've been breathing air for ";
    // Get difference of years, months, and days
    let yearVal = thisdate.getUTCFullYear() - birthdate.getUTCFullYear();
    let monthVal = thisdate.getUTCMonth() - birthdate.getUTCMonth();
    let dayVal = thisdate.getUTCDate() - birthdate.getUTCDate();
    // This code fixes the "negative days" bug when date is less than birthdate
    if (dayVal < 0) {
        monthVal -= 1;
        dayVal += new Date(thisdate.getUTCFullYear(), monthVal, 0).getDate();
    }
    // This code fixes the "negative months" bug when date is less than birthdate
    if (monthVal < 0) {
        yearVal -= 1;
        monthVal = 12 + monthVal;
    }
    // Construct date texts
    yearText = makeDateChunk(yearText, yearVal);
    monthText = makeDateChunk(monthText, monthVal);
    dayText = makeDateChunk(dayText, dayVal);
    // Determine sentence structure based on age
    if (monthVal == 0 && dayVal == 0)
        ageText += `exactly ${yearText}. Happy birthday, Vitaly.`;
    else if (monthVal == 0)
        ageText += `${yearText} and ${dayText}. So by now I'm pretty good at it.`
    else if (dayVal == 0)
        ageText += `${yearText} and ${monthText}. So by now I'm pretty good at it.`
    else
        ageText += `${yearText}, ${monthText}, and ${dayText}. So by now I'm pretty good at it.`;
    // Write age sentence on the page
    document.querySelector("#age").innerHTML = ageText;
    // Pick a random subtitle to display
    document.querySelector("#subtitle").innerHTML = "<em>" + subtitles[Math.floor(Math.random() * subtitles.length)] + "</em>"; 
}

// Create an html string for a date value
// Input begins with a plural unit of measure
function makeDateChunk(dateText, dateVal) {
    // Make it singular if necessary
    if (dateVal == 1)
        dateText = dateText.slice(0, -1);
    
    // Combine and add a trim span
    dateText = `<span class = trim>${dateVal} ${dateText}</span>`;
    return dateText;
}

// Toggle menu visibility
function toggleMenu(visibility) {
    for (let i = 0; i < menu.childElementCount; i++)
        menu.children[i].style.visibility = visibility;

    if (visibility == "visible")
        menu.style.boxShadow = "0px 10px 10px rgba(0, 0, 0, 0.5)";
    else if (visibility == "hidden")
        menu.style.boxShadow = "none";
}

// Travel to a part of the page
const travelTo = (id) => {
    window.location = "#" + id;
    window.scrollTo(window.scrollX, window.scrollY + 200);
}