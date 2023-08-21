'use strict';
import { genApe } from './ape-gen.js';
import { travelTo } from './helper.js';

// -------------------------------------
// - - - - - V A R I A B L E S - - - - -
// -------------------------------------

// Declare a bank of subtitles
let subtitles = [
  'Stick Figure Badminton 3 enthusiast',
  'Connect Four god',
  'Ex-Camp Counselor',
  'Extremely cool individual',
  'Huge fan of apes',
  'Founder of Sea Monkey Studios',
  'Certified tall person',
  'Relatively incredible',
  'Occasional graphic designer',
  'Embracer of rain',
  'Champion of worms',
  'Robot sympathizer',
  'Slightly amphibious',
  'AI rights activist',
  'Bionicle expert',
];

// Declare a bank of trim colors
let colors = ['#2CFF5E', '#8FF4FF', '#FDA6FF', '#FFE41D'];
// Bank of filters corresponds to bank of trim colors
// Filters calculated with https://codepen.io/sosuke/pen/Pjoqqp
let filters = [
  'invert(89%) sepia(31%) saturate(1734%) hue-rotate(63deg)  brightness(113%) contrast(103%)', // 0.0 accuracy loss
  'invert(87%) sepia(19%) saturate(1143%) hue-rotate(155deg) brightness(102%) contrast(101%)', // 0.0 accuracy loss
  'invert(83%) sepia(93%) saturate(7452%) hue-rotate(254deg) brightness(102%) contrast(103%)', // 2.4 accuracy loss
  'invert(85%) sepia(47%) saturate(741%) hue-rotate(354deg) brightness(101%) contrast(103%)', // 0.0 accuracy loss
];
// Trim index determines which color will be used for trimming
let trimIndex = Math.floor(Math.random() * colors.length);

// Get some page elements
let menu = document.querySelector('#menu');
let trimImgs = document.querySelectorAll('.trimfilter');

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

  // Set trim color value
  document.documentElement.style.setProperty('--hex-trim', colors[trimIndex]);
  // Filter all trim images
  for (let i = 0; i < trimImgs.length; i++)
    trimImgs[i].style.filter = filters[trimIndex];

  // - - - AGE BLURB - - -

  // Declare all age variables
  let birthdate = new Date(2002, 2, 15); // For some godforsaken reason, only months are 0 based
  let thisdate = new Date();
  let yearText = 'years';
  let monthText = 'months';
  let dayText = 'days';
  let ageText = '<strong>Age:</strong> ';
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
    ageText += `exactly ${yearVal}. Happy birthday!`;
  else if (monthVal == 0) ageText += `${yearText}, ${dayText}`;
  else if (dayVal == 0) ageText += `${yearText}, ${monthText}`;
  else ageText += `${yearText}, ${monthText}, ${dayText}`;
  // Write age sentence on the page
  document.querySelector('#age').innerHTML = ageText;
  // Pick a random subtitle to display
  document.querySelector('#subtitle').innerHTML =
    '<em>' + subtitles[Math.floor(Math.random() * subtitles.length)] + '</em>';
};

// Create an html string for a date value
// Input begins with a plural unit of measure
function makeDateChunk(dateText, dateVal) {
  // Make it singular if necessary
  if (dateVal == 1) dateText = dateText.slice(0, -1);

  // Combine and add a trim span
  dateText = `<span class = trim>${dateVal}</span> ${dateText}`;
  return dateText;
}

// Toggle menu visibility
function toggleMenu(visibility) {
  for (let i = 0; i < menu.childElementCount; i++)
    menu.children[i].style.visibility = visibility;

  if (visibility == 'visible')
    menu.style.boxShadow = '0px 10px 10px rgba(0, 0, 0, 0.5)';
  else if (visibility == 'hidden') menu.style.boxShadow = 'none';
}

export { trimIndex, filters };
